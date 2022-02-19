import Event from "../../models/event.js"
import User from "../../models/user.js"

const join_event = (req, res, next) => {
    const {
        id
    } = req.body

    Event.findOne({ _id: id }, (err, event) => {
        if (err) return next(err)

        if (event.users.indexOf(req.user.email) != -1) {
            event.set({
                users: event.users.filter(email => email != req.user.email)
            })
        } else {
            event.set({
                users: [
                    ...event.users,
                    req.user.email
                ]
            })            
        }

        event.save((err) => {
            if (err) return next(err)

            User.findOne({ _id: event.author }, (err, author) => {
                if (err) return next(err)

                res.json({
                    title: event.title,
                    description: event.description,
                    author: author.name,
                    users: event.users
                })
            })
        })
    })
}

export default join_event