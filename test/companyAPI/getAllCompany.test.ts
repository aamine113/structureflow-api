import request from 'supertest'
import app from '../../src/app'
import { db } from '../../src/config/dbConnection'
import getEnvVar from '../../src/config/config'

jest.mock('../../src/config/dbConnection', () => ({
    db: {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn()
    }
}))

const mockCompanies = [
    { id: 1, name: 'Company A', totalEmployees: 100 },
    { id: 2, name: 'Company B', totalEmployees: 45 },
    { id: 3, name: 'Company C', totalEmployees: 3 }
]

describe('GET /company', () => {
    it('should return a 200 status and an array of companies', async () => {
        (db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).find().toArray as jest.Mock).mockResolvedValueOnce(mockCompanies)
        const response = await request(app).get('/company')
        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual(mockCompanies)
    })

    it('should return a 500 status if an error occurs', async () => {
        (db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).find().toArray as jest.Mock).mockRejectedValueOnce(new Error('Database error'))
        const response = await request(app).get('/company')
        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Database error')
    })
})
