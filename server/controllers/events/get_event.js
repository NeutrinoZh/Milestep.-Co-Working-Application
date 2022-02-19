import Event from "../../models/event.js"
import User from '../../models/user.js'

const get_event = (req, res, next) => {
    const {
        id
    } = req.body

    Event.findOne({ _id: id }, (err, event) => {
        if (err) return next(err)

        User.findOne({ _id: event.author }, (err, author) => {
            if (err) return next(err)

            console.log('author:', author._id)

            res.json({
                title: event.title,
                description: event.description,
                author: author.name,
                author_id: author._id,
                users: event.users
            })
        })
    })
}

export default get_event