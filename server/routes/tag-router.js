import express from 'express'
import { getTagCloud } from '../controllers/tag-controller.js'

const router = new express.Router()

router.get('/', getTagCloud)

export default router
