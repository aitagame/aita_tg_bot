import Bot from 'node-telegram-bot-api'
import config from '@src/config'

const token = config
if (!token) {
    throw new Error('TOKEN IS REQUIRED')
}

const bot = new Bot(config.bot.token as string)

bot.startPolling()


export default bot