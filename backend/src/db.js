import mongoose from "mongoose"
import * as dotenv from 'dotenv'

dotenv.config({path: 'config.env' })

const { MONGO_URI } = process.env;

console.log("MONGO_URI = ", MONGO_URI)

export const client = await mongoose.connect(MONGO_URI)
