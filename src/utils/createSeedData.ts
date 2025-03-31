import getEnvVar from '../config/config'
import { db } from '../config/dbConnection'
import { Company } from '../models/company'

const companies: Company[]  = [
    {
        name: "Alpha",
        dateIncorporated: "2020-05-12T23:50:21.817Z",
        description: "Alpha company",
        totalEmployees: 14,
        address: {
            street: "1 Mark Square",
            city: "London",
            postcode: "EC2A 4EG"
        }
    },
    {
        name: "Beta",
        dateIncorporated: "2022-01-11T11:12:21.817Z",
        description: "Beta company",
        totalEmployees: 51,
        address: {
            street: "44 Eaton Road",
            city: "Birmingham",
            postcode: "B23 4MP"
        }
    },
    {
        name: "Gamma",
        dateIncorporated: "2024-12-22T01:10:21.817Z",
        description: "Gamma company",
        totalEmployees: 7,
        address: {
            street: "15 Corrigs Rd",
            city: "Newcqstle",
            postcode: "BT33 0JZ"
        }
    }
]

const insertSeedData = async () => {
    try {
        const res = await db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).insertMany(companies)
        console.log('Seed data created successfully')
        return { created: res }
    }
    catch(error) {
        console.error(error)
        return { error }
    }
    finally {
        console.log('Exiting process...')
        process.exit()  
    }
}

insertSeedData()