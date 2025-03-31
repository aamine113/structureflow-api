import Router, {Request, Response} from 'express'
import { db } from '../../config/dbConnection'
import { ObjectId } from 'mongodb'

const router = Router()

router.put('/company/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        if (!ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid ID format' })
            return
        }
        const collection = db.collection('company')
        const updateCompany = req.body

        const result = await collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {$set: updateCompany},
            {returnDocument: "after"},
        )

        if(!result) {
            res.status(404).send({ messsage: "Company not found"})
            return
        }        

        res.status(200).json(result)
    }
    catch (error) {
        console.error('An error occurred in PUT /company/:id', error)
        res.status(500).json({message: 'An error occurred', error: error instanceof Error ? error.message : error})
    }
})

export { router as putCompanyRouter }