import mongoose from 'mongoose'

const ResetPasswordSchema = new mongoose.Schema({
    email: { type: String, required: true, min: 5, max: 100 },
    link: { type: String, required: true, min: 10, max: 100 },
    date: { type: Date, required: true },
    active: { type: Boolean, required: true }
})

ResetPasswordSchema.virtual('isValid').get(function() {
    return new Date(Date.now()) < this.date
})

export default mongoose.model('ResetPassword', ResetPasswordSchema)