import { MongoClient } from "mongodb"
import { connect } from "mongoose"
import getEnvVar from './config'
require('dotenv').config()

const client = new MongoClient(getEnvVar('DB_CONNECTION_STRING'))
const db = client.db(getEnvVar('DB_NAME'))

const connectToMongoDb = async (): Promise<object> => {
    try {
        await connect(getEnvVar('DB_CONNECTION_STRING'))
        console.log('Connected to Mongo DB!')

        return { status: 200, msg: 'Successfully connected to Mongo DB'}
    }
    catch(error) {
        console.error(error)
        return { status: 400, msg: 'Connection failed'}
    }
}

export { client, db }
export default connectToMongoDb