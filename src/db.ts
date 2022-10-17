import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const {
    DB_HOST,
    DB_PASSWORD,
    DB_USERNAME,
    DB_NAME,
    DB_PORT
} = process.env

if (!DB_HOST) throw new Error('HOST REQUIRED')
if (!DB_PASSWORD) throw new Error('PASSWORD REQUIRED')
if (!DB_USERNAME) throw new Error('USERNAME REQUIRED')
if (!DB_NAME) throw new Error('NAME REQUIRED')
if (!DB_PORT) throw new Error('PORT REQUIRED')

const db = mysql.createConnection({
    host: DB_HOST,
    password: DB_PASSWORD,
    user: DB_USERNAME,
    database: DB_NAME,
    port: parseInt(DB_PORT)
})

export default db