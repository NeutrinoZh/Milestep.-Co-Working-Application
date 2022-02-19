import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
    email: { type: String, required: true, min: 5, max: 100 },
    date: { type: Date, required: true }
})

export default mongoose.model('Token', TokenSchema)