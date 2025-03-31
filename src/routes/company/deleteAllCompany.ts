import { Router } from 'express'
import { db } from '../../config/dbConnection'
import getEnvVar from '../../config/config'

const router = Router()

router.delete('/company', async (_req, res) => {
    try {
        const companyCollection = getEnvVar('COMPANY_COLLECTION_NAME')
        const result = await db.collection(companyCollection).deleteMany({})

        res.status(200).json({ message: 'Deleted successfully', deletedCount: result.deletedCount })
    } catch (error) {
        console.error('An error occurred in DELETE /company', error)
        res.status(500).json({message: 'An error occurred', error: error instanceof Error ? error.message : error})
    }
})

export { router as deleteAllCompanyRouter }
