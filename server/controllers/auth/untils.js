import crypto from 'crypto'
import config from '../../config.js'

export const password_hash = (password) => 
    crypto.createHash('sha256').update(password + config.salt).digest('hex') 