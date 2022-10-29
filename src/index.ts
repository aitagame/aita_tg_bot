import './paths';
import db from './config/db'
import bot from './config/bot'
import redis from './config/redis'
import textController from '@handlers/textController';
import callbackQueryController from '@handlers/cbQueryController';
import { userData } from 'types/redisUserData'
import finishWork from '@tools/finishWork';

async function restoreTasks() {
    const keysList = await redis.keys('*')
    if (!keysList) {
        return console.log('Empty set.')
    }
    keysList.forEach(async (item) => {
        const response = await redis.get(item) as string
        const userData = JSON.parse(response) as userData

        if (userData.state.action === 'idle' || userData.state.start === null || userData.state.end === null) {
            return
        }

        const elapsedTime = userData.state.end - Date.now()

        setTimeout(() => {
            finishWork(userData.user_id)
        }, elapsedTime)
    })
}

async function startServer() {
    try {
        db.connect(() => {
            console.log('Connected to DB')
        })
        await bot.startPolling().then(_ => console.log('Bot started polling successfully'))
        await redis.connect().then(() => {
            console.log('Redis connected')
        })
    }
    catch (err) {
        throw err
    }
}

startServer().then(() => {
    restoreTasks().then(() => {
        bot.on('text', textController)
        bot.on('callback_query', callbackQueryController)
    })
})

