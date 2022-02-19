import User from '../../models/user.js'
import Token from '../../models/token.js'

import config from '../../config.js'

/*
        User verification.
    Accepts a JWE token.
    If the token has not been passed we return a 401 error code.
    If there is a token we are looking for the user who owns this token.
    If the user is not found return a 401 error code.
    If the user is found look for the token object.
    If one is not found or it is expired we return a 401 error code.
    If the token is found and it is valid increase its expiration date
        and write the user to the request object
        and move on to the next middleware.
*/

const check_user = (req, res, next) => {
    if (!req.body.token)
        return res.sendStatus(401)

    User.findOne({ 'token': req.body.token }).exec((err, found_user) => {
        if (err) return next(err)

        if (!found_user) 
            return res.sendStatus(401)

        Token.findOne({ _id: req.body.token }, (err, found_token) => {
            if (err) return next(err)

            if (!found_token || found_token.date <= new Date(Date.now()))
                return res.sendStatus(401)

            found_token.set({
                date: new Date(Date.now() + config.maxAgeToken),
            })

            found_token.save((err) => {
                if (err) return next(err)

                req.user = found_user
                next()
            })
        })
    })
}

export default check_user