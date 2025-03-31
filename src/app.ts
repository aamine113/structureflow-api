import express from 'express'
import cors from 'cors'
import { postCompanyRouter } from './routes/company/postCompany'
import { getAllCompanyRouter } from './routes/company/getAllCompany'
import { getCompanyRouter } from './routes/company/getCompany'
import { deleteCompanyRouter } from './routes/company/deleteCompany'
import { deleteAllCompanyRouter } from './routes/company/deleteAllCompany'
import { putCompanyRouter } from './routes/company/putCompany'

const app = express()

app.use(express.json())
app.use(cors())

app.use(postCompanyRouter)
app.use(getAllCompanyRouter)
app.use(getCompanyRouter)
app.use(deleteCompanyRouter)
app.use(deleteAllCompanyRouter)
app.use(putCompanyRouter)

app.get('/', (_req, res): void => {
    try{
        res.send('Welcome to Structureflow API!')
    }
    catch(error) {
        console.error(error)
        res.json({ error })
    }
})

export default app