import { Request, Response, Router } from 'express'
import { db } from '../../config/dbConnection'
import getEnvVar from '../../config/config'
import { isValidObjectId } from 'mongoose'
import { ObjectId } from 'mongodb'

const router = Router()

router.delete('/company/:id', async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params
        if (!isValidObjectId(id)) {
            res.status(400).json({ message: 'Invalid ID format'})      
            return
        }

        const companyCollection = getEnvVar('COMPANY_COLLECTION_NAME')
        const result = await db.collection(companyCollection).deleteOne({ _id: new ObjectId(id)})

        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Company not found' })
            return
        }

        res.status(200).json({ message: 'Company deleted successfully' })
    } catch (error) {
        console.error('An error occurred in DELETE /company/:id', error)
        res.status(500).json({message: 'An error occurred', error: error instanceof Error ? error.message : error})
    }
})

export { router as deleteCompanyRouter }
