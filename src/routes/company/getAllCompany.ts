import { Router, Request, Response } from 'express'
import { db } from '../../config/dbConnection'
import getEnvVar from '../../config/config'


const router = Router()

router.get('/company', async (_req: Request, res: Response): Promise<void> => {
    try {
        const companyCollection = getEnvVar('COMPANY_COLLECTION_NAME')
        const result = await db.collection(companyCollection).find().toArray()

        res.status(200).json(result)
    }
    catch(error) {
        console.error('An error occurred in GET /company', error)
        res.status(500).json({message: 'An error occurred', error: error instanceof Error ? error.message : error})
    }
})

export { router as getAllCompanyRouter }