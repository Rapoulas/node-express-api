import express from 'express'
import {PORT, HOST} from '../config.js'
import {users} from '../db-memory/user.js'
import listAll from '../controllers/user/listAll.js'
import create from '../controllers/user/create.js'
import edit from '../controllers/user/edit.js'
import remove from '../controllers/user/remove.js'
import getById from '../controllers/user/getById.js'

const router = express.Router()

router.get('/:id', getById)
router.get('/', listAll)
router.post('/', create)
router.put('/', edit)
router.delete('/', remove)
router.put('/:id', edit)
router.delete('/:id', remove)

export default router