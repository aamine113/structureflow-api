import request from 'supertest'
import app from '../../src/app'
import { db } from '../../src/config/dbConnection'
import getEnvVar from '../../src/config/config'

jest.mock('../../src/config/dbConnection', () => ({
    db: {
        collection: jest.fn().mockReturnThis(),
        deleteOne: jest.fn()
    }
}))

const mockDeleteCompany = {
    message: "Company deleted successfully"
}

describe('DELETE /company/:id', () => {
    it('should return a 200 status', async () => {
        (db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).deleteOne as jest.Mock).mockResolvedValueOnce(mockDeleteCompany)
        const response = await request(app).delete('/company/67eadb0b3cba6aec9dd76732')

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual(mockDeleteCompany)
    })

    it('should return a 500 status if an error occurs', async () => {
        (db.collection(getEnvVar('COMPANY_COLLECTION_NAME')).deleteOne as jest.Mock).mockRejectedValueOnce(new Error('Database error'))
        const response = await request(app).delete('/company/67eadb0b3cba6aec9dd76732')

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Database error')
    })
})
