import Event from "../../models/event.js"

const get_events = (req, res, next) => {
    const {
        userId
    } = req.body

    if (userId) {
        Event.find({ author: userId }).exec((err, events) => {
            if (err) return next(err)
    
            res.json(events.map((event) => {
                return {
                    title: event.title,
                    description: event.description,
                    num_users: event.users.length,
                    like: event.like.length,   
                    id: event._id,
                    date: event.date
                }
            }))
        })
    } else {
        Event.find({}).exec((err, events) => {
            if (err) return next(err)
    
            res.json(events.map((event) => {
                return {
                    title: event.title,
                    description: event.description,
                    num_users: event.users.length,
                    like: event.like.length,  
                    active: (event.like.indexOf(req.user._id) != -1),
                    id: event._id,
                    date: event.date
                }
            }))
        })
    }
}

export default get_events