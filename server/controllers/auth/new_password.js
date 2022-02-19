import ResetPassword from '../../models/reset_password.js'
import { password_hash } from './untils.js'

/*
    Setting a new password.
    Accepts link id, password and password repeat.
    We are looking for a link by id.
    If we do not find it, we return an error code (link_invalid)
    if the link is found and it is valid, we check for the presence of passwords in the request. 
    If they are not present, we return an error code (new_password_data_invalid). 
    If there are passwords, then we check whether they are the same. 
    If not, we return an error code (password_mismath).
    If the passwords are the same, then we remove all links for resetting passwords associated with the email from this link.
    Then we find the user by email from the link and change his password.
*/

const new_password = (req, res, next) => {
    ResetPassword.findOne({ link: req.params.id }, (err, found_link) => {
        if (err) return next(err)

        if (!found_link || !found_link.isValid || !found_link.active)
            return res.json({ error: `link_invalid` })

        let {
            password, repassword,
        } = req.body 
        
        if (!password || !repassword)
            return res.json({ error: 'new_password_data_invalid' })

        password = password_hash(password)
        repassword = password_hash(repassword)

        if (password != repassword)
            return res.json({ error: `password_mismatch` })

        ResetPassword.deleteMany({ 'email': found_link.email }, (err) => {
            if (err) return next(err)

            User.findOne({ 'email': found_link.email }).exec((err, found_user) => {
                if (err) return next(err)

                found_user.set({
                    password: password
                })

                found_user.save((err) => {
                    if (err) return next(err)
                    res.json({})
                })
            })
        })
    })
}

export default new_password