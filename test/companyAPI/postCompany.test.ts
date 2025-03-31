import request from 'supertest'
import app from '../../src/app'
import { db } from '../../src/config/dbConnection'
import getEnvVar from '../../src/config/config'

jest.mock('../../src/config/dbConnection', () => ({
    db: {
        collection: jest.fn().mockReturnThis(),
        insertOne: jest.fn()
    }
}))

const mockPostCompany = {
    acknowledged: true,
    insertedId: "67ead2a658a017359392dd3a"
}

const mockCompany = {
    name: "Alpha",
    dateIncorporated: "2020-05-12T23:50:21.817Z",
    description: "Alpha company",
    totalEmployees: 14,
    address: {
        street: "1 Mark Square",
        city: "London",
        postcode: "EC2A 4EG"
    }
}

describe('POST /company', () => {
    it('should return a 201 status', async () => {
        (db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).insertOne as jest.Mock).mockResolvedValueOnce(mockPostCompany)
        const response = await request(app)
            .post('/company')
            .send(mockCompany)
            
        expect(response.status).toBe(201)
        expect(response.body).toStrictEqual(mockPostCompany)
    })

    it('should return a 500 status if an error occurs', async () => {
        (db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).insertOne as jest.Mock).mockRejectedValueOnce(new Error('Database error'))
        const response = await request(app).post('/company')
        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Database error')
    })
})
