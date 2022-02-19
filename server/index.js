import express from "express";
import cors from 'cors'
import mongoose from 'mongoose'
import multiparty from 'multiparty'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import authRouter from './routers/auth.js'
import eventsRouter from './routers/events.js'
import config from './config.js';

//----------------------------------------------------/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//----------------------------------------------------/

const app = express()
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
})
app.use(cors())
app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    if (req.is('multipart/form-data')) {
        const form = new multiparty.Form()
        form.parse(req, (err, fields, files) => {
            if (!err) {
                req.body = fields
                req.files = files
            }
    
            next()
        })
    } else {
        next()
    }
})

app.use(authRouter)
app.use(eventsRouter)

app.listen(config.port)