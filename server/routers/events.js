import express from 'express'

import config from '../config.js'

import add_event from '../controllers/events/add_event.js'
import get_events from '../controllers/events/get_events.js'
import get_event from '../controllers/events/get_event.js'
import join_event from '../controllers/events/join_event.js'
import delete_event from '../controllers/events/delete_event.js'
import like_event from '../controllers/events/like_event.js'

const router = express.Router()

router.post(config.urls.get_event, get_event)
router.post(config.urls.add_event, add_event)
router.post(config.urls.get_events, get_events)
router.post(config.urls.join_event, join_event)
router.post(config.urls.delete_event, delete_event)
router.post(config.urls.like, like_event)

export default router