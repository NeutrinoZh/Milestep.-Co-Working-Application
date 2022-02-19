import ResetPassword from '../../models/reset_password.js'

/*
    Password reset link.
    We are looking for a link by id. 
    If we do not find it, we return a message about it.
    If the link is found, we activate it 
    After which we redirect the user to the password change page passing a unique password reset code to the url.
*/

const reset_link = (req, res, next) => {
    ResetPassword.findOne({ link: req.params.id }, (err, found_link) => {
        if (err) return next(err)

        if (!found_link || !found_link.isValid)
            return res.send('Link is invalid or does not exist')

        found_link.set({
            active: true
        })

        found_link.save((err) => {
            if (err) return next(err)
            res.redirect(`http://localhost:3000/auth/reset-link/${req.params.id}`)
        })
    })
}

export default reset_link