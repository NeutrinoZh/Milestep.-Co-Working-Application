import fs from 'fs'

/*

*/
export const change_name = (req, res, next) => {
    if (!req.body.name)
        return res.json({ error: 'change_name_invalid_data' })

    req.user.set({
        name: req.body.name
    })

    req.user.save((err) => {
        if (err) return next(err)

        res.json({})
    })
}

/*

*/
export const change_email = (req, res, next) => {
    if (!req.body.email)
        return res.json({ error: 'change_email_invalid_data' })
 
    req.user.set({
        email: req.body.email
    })

    req.user.save((err) => {
        if (err) return next(err)

        res.json({})
    })
}

/*
    
*/
export const change_avatar = (req, res, next) => {
    if (!req.files)
        return res.json({ error: 'change_avatar_invalid_data' })

    const path = `http://localhost:3033/${req.files.avatar[0].originalFilename}`
    fs.createReadStream(req.files.avatar[0].path).pipe(fs.createWriteStream(`./public/${req.files.avatar[0].originalFilename}`));
    
    req.user.set({
        avatar: path
    })

    req.user.save((err) => {
        if (err) return next(err)

        res.json({
            avatar: path
        })
    })
}