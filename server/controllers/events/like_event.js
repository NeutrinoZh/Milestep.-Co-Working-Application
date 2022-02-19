import Event from "../../models/event.js"

const like_event = (req, res, next) => {
    const {
        id
    } = req.body

    Event.findOne({ _id: id }, (err, event) => {
        if (err) return next(err)

        if ( event.like.indexOf(req.user._id) != -1 ) {
            event.set({
                ...event,
                like: event.like.filter(user => user != req.user._id)
            })

        } else {
            event.set({
                ...event,
                like: [
                    ...event.like,
                    req.user._id
                ]
            })
        }

        event.save((err) => {
            if (err) return next(err)
            
            res.json(event.like.length)
        })
    })
}

export default like_event