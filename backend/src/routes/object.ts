import { Object } from '../models/objects'
import express from 'express'

export const objectRouter = express.Router();

objectRouter.get('', async (req, res) => {
    try {
        const obj = await Object.find().then(obj => {
            if (obj) {
                return res.send(obj)
            } else {
                return res.status(404).send({ message: `Objects not found.` })
            }
        })
    } catch (error) {
        return res.status(500).send({ message: `Get failed: ${error}` })
    }
})
//get object by id
objectRouter.get('/:id', async (req, res) => {
    try {
        const obj = await Object.findOne({ _id: req.params.id }, req.body).then(obj => {
            if (obj) {
                return res.send(obj)
            } else {
                return res.status(404).send({ message: `Object not found.` })
            }
        })
    } catch (error) {
        return res.status(500).send({ message: `Error: ${error}` })
    }
})

objectRouter.post('', async (req, res) => {
    try {
        const obj = await Object.create(req.body)
        return res.send(obj)
    } catch (error) {
        return res.status(500).send({ message: `Error: ${error}` })
    }
})
