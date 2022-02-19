import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true, min: 3, max: 100 },
    description: { type: String, required: true, min: 3, max: 100 },
    author: { type: String, required: true },
    users: [ String ],
    like: [ String ]
})

export default mongoose.model('Event', EventSchema)