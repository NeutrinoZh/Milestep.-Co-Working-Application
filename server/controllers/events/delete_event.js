import Event from "../../models/event.js"

const delete_event = (req, res, next) => {
    const {
        id
    } = req.body

    console.log('??', id, req.user)

    Event.findOne({ _id: id }, (err, event) => {
        if (err) return next(err)

        if (req.user._id == event.author) {
            Event.deleteOne({ _id: id}, (err) => {
                if (err) return next(err)
                res.json({})
            })
        } else {
            res.json({ error: 'cannot_delete_event' })
        }
    })
}

export default delete_event