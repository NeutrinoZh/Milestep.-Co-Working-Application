import { password_hash } from './untils.js'

import User from '../../models/user.js'
import Token from '../../models/token.js'

import config from '../../config.js'

/*
        Authorization.
    Accepts email and password.
    If something was not sent we return the error code (signup_invalid_data)
    if everything was sent search for a user by email
    if we do not find it we send the error code (signin_invalid_data)
    if the user is found we compare the password hashes
    if they do not match we send the error code (signin_invalid_data)
    if they match then we delete all JWE tokens associated with this user and create a new JWE token.
    After that we send the user's name, email and the newly created token to the client.
*/

const signin = (req, res, next) => {
    let {
        email, password
    } = req.body

    if (!(email && password)) 
        return res.json({ error: `signin_invalid_data` })

    password = password_hash(password)

    User.findOne({ 'email': email }).exec((err, found_user) => {
        if (err) return next(err)

        if (!found_user || found_user.password != password) 
            return res.json({ error: 'signin_invalid_data' });

        Token.deleteMany({ email: found_user.email }, (err) => {
            if (err) return next(err)

            const JWEtoken = new Token({
                email: found_user.email,
                date: new Date(Date.now() + config.maxAgeToken)
            })

            found_user.set({
                token: JWEtoken._id
            })

            found_user.save((err) => {
                if (err) return next(err)

                JWEtoken.save((err) => {
                    if (err) return next(err)

                    res.json({
                        name: found_user.name,
                        email: found_user.email,
                        interests: found_user.interests,
                        job: found_user.job,
                        university: found_user.university,
                        what_looking: found_user.what_looking,
                        token: found_user.token,
                        avatar: found_user.avatar
                    })
                })
            })
        })
    })
}

export default signin