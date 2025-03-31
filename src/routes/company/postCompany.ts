import Router, {Request, Response} from 'express'
import { Company } from '../../models/company'
import { db } from '../../config/dbConnection'
import getEnvVar from '../../config/config'


const router = Router()

router.post('/company', async (req: Request, res: Response): Promise<void> => {
    try {
        const collection = db.collection(getEnvVar('COMPANY_COLLECTION_NAME'))
        const { name, dateIncorporated, description, totalEmployees, address  } = req.body

        const newCompany: Company = {
            name,
            dateIncorporated,
            description,
            totalEmployees,
            address
        }

        const result = await collection.insertOne(newCompany)
        res.status(201).json(result)
    }
    catch (error) {
        console.error('An error occurred in POST /company', error)
        res.status(500).json({message: 'An error occurred', error: error instanceof Error ? error.message : error})
    }
})

export { router as postCompanyRouter }