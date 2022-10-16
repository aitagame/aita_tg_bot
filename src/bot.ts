import Bot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.TOKEN
if (!token) {
    throw new Error('TOKEN IS REQUIRED')
}

const bot = new Bot(token)

bot.startPolling()


export default bot