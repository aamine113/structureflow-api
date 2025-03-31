import request from 'supertest'
import app from '../../src/app'
import { db } from '../../src/config/dbConnection'
import getEnvVar from '../../src/config/config'

jest.mock('../../src/config/dbConnection', () => ({
    db: {
        collection: jest.fn().mockReturnThis(),
        findOneAndUpdate: jest.fn()
    }
}))

const mockPutCompany = {
    id: "67eadb0b3cba6aec9dd76732",
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

describe('PUT /company/:id', () => {
    it('should return a 200 status', async () => {
        (db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).findOneAndUpdate as jest.Mock).mockResolvedValueOnce(mockPutCompany)
        const response = await request(app)
            .put('/company/67eadb0b3cba6aec9dd76732')
            .send(mockPutCompany)

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual(mockPutCompany)
    })

    it('should return a 500 status if an error occurs', async () => {
        (db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).findOneAndUpdate as jest.Mock).mockRejectedValueOnce(new Error('Database error'))
        const response = await request(app)
            .put('/company/67eadb0b3cba6aec9dd76732')
            .send(mockPutCompany)

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Database error')
    })

    it('should return a 404 as the route does not exist', async () => {
        const response = await request(app)
            .put('/company')
            .send(mockPutCompany)
            
        expect(response.status).toBe(404)
    })
})
