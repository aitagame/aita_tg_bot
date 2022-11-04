import './paths';
import bot from './config/bot'
import redis from './config/redis'
import textController from '@handlers/textController';
import callbackQueryController from '@handlers/cbQueryController';
import restoreTasks from '@tools/restoreTasks';
import inlineQueryController from '@handlers/inlineQueryController';

async function startServer() {
    try {
        await bot.startPolling().then(_ => console.log('Bot started polling successfully'))
        await redis.connect().then(() => {
            console.log('Redis connected')
        })
    }
    catch (err) {
        throw err
    }
}

startServer()
    .then(async () => {
        await restoreTasks()
    })
    .then(() => {
        bot.on('text', textController)
        bot.on('callback_query', callbackQueryController)
        bot.on('inline_query', inlineQueryController)
    })