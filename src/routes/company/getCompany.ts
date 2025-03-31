import { Router, Request, Response } from 'express'
import getEnvVar from '../../config/config'
import { db } from '../../config/dbConnection'
import { isValidObjectId } from 'mongoose'
import { ObjectId } from 'mongodb'


const router = Router()
router.get('/company/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!isValidObjectId(id)) {
            res.status(400).json({ message: 'Invalid ID format' })
            return
        }

        const company = await db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).findOne({ _id: new ObjectId(id)})

        if (!company) {
            res.status(404).json({ message: 'Company not found' })
            return
        }

        res.status(200).json(company)
    } catch (error) {
        console.error('An error occurred in GET /company/:id', error)
        res.status(500).json({message: 'An error occurred', error: error instanceof Error ? error.message : error})
    }
})

export { router as getCompanyRouter }