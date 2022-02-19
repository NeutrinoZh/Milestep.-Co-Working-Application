import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'

import User from '../../models/user.js'

import config from '../../config.js'

/*
        Password reset.
    In an instantly called function we enter Google mail. Then we return the middleware.
    Accepts email.
    If email was not included in the request, we return an error code (reset_invalid_data).
    If there is an email, we are looking for a user with this mail.
    If the user does not exist, return an error code (user_not_exist).
    If there is a user, remove any existing password reset links associated with this email.
      After that, we create a new link to reset the password and create mail (using the template from the file)
          with a link to the user's email.
*/

const reset = (() => { 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'neutrinozhc@gmail.com',
          pass: '', //! There should be a password here
        }
    })

    return (req, res, next) => {
        if (!req.body.email)
            return res.json({ error: `reset_invalid_data` })

        User.findOne({ email: req.body.email }, (err, found_user) => {
            if (err) return next(err)

            if (!found_user)
                return res.json({ error: `user_not_exist` })

            ResetPassword.deleteMany({ email: req.body.email }, (err) => {
                if (err) return next(err)
    
                const link = new ResetPassword({
                    email: req.body.email, 
                    link: uuidv4(),
                    date: new Date(Date.now() + config.maxAgeResetLink),
                    active: false
                })
    
                link.save((err) => {
                    if (err) return next(err)
    
                    const url = config.urls.server + config.urls.reset_link + link.link;
                    async function send() {
                        await transporter.sendMail({
                            from: '"NeutrinoZhC" <neutrinozhc@gmail.com>',
                            to: req.body.email,
                            subject: 'Reset password',
                            text: `Link for reset password: ${url}`,
                            html: fs.readFileSync('./emails/reset_password.html', "utf8").replace('{% URL %}', url),
                        }) 
                    }
    
                    send()
                    res.json({})
                })
            })
        })
    }
})()

export default reset