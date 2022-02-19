import { password_hash } from './untils.js'
import User from '../../models/user.js'

/*
        Registration.
    Accepts name, email, password and repeat password.
    If something was not sent we return the error code (signup_invalid_data)
    if everything was sent we look for the user by email
    if the user was found then we return the error code (user_already_exist)
    if the user is not found we check the equivalence of passwords.
    If the passwords are not equal return an error code (password_mismatсh)
    If the passwords are the same create a new user and return an empty  object.
*/

const signup = (req, res, next) => {
    let {
        name, email, password, repassword, interests, job, university, what_looking
    } = req.body

    if (!(name && email && password && repassword)) 
        return res.json({ error: `signup_invalid_data` })

    password = password_hash(password)
    repassword = password_hash(repassword)

    User.findOne({ 'email': email }).exec((err, found_user) => {
        if (err) return next(err)

        if (found_user) 
            return res.json({ error: `user_already_exist` })
        if (password != repassword)
            return res.json({ error: `password_mismatch` })

        let user = new User({
            name: name,
            email: email,
            password: password,
            interests: interests,
            job: job,
            university: university,
            what_looking: what_looking  
        })

        user.save((err) => {
            if (err) return next(err)
            res.json({})
        })
    })
}

export default signup