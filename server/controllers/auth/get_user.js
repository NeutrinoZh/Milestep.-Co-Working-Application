import User from "../../models/user.js"

const get_user = (req, res, next) => {
    const {
        id
    } = req.body

    if (!id)
        res.json('invalid_get_user_data')

    User.findOne({ _id: id }, (err, found_user) => {
        if (err) return next(err)

        res.json({
            name: found_user.name,
            email: found_user.email,
            interests: found_user.interests,
            job: found_user.job,
            university: found_user.university,
            what_looking: found_user.what_looking,
            token: found_user.token,
            avatar: found_user.avatar,
            id: found_user._id
        })
    })
}

export default get_user