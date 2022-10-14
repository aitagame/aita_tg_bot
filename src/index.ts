import dotenv from 'dotenv'

dotenv.config()

const BOT_TOKEN = process.env.BOT_API_TOKEN
const NODE_ENV = process.env.NODE_ENV

console.log('token is: ', BOT_TOKEN)

console.log('current mode is: ', NODE_ENV)