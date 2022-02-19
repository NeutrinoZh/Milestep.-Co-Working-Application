import Event from "../../models/event.js"

const add_event = (req, res, next) => {
    const {
        title, 
        description,
        date
    } = req.body

    if (!(title && description))
        res.json({ error: 'invalid_data_add_event' })

    let event = new Event({
        title: title,
        description: description,
        date: date,
        author: req.user._id
    })

    event.save((err) => {
        if (err) return next(err);

        res.json({})
    })
}

export default add_event