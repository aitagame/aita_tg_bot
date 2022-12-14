import './paths';
import bot from './config/bot'
import redis from './config/redis'
import textController from '@handlers/textController';
import callbackQueryController from '@handlers/cbQueryController';
import restoreTasks from '@tools/actions/restoreTasks';
import inlineQueryController from '@handlers/inlineQueryController';
import { flushDuelsAfterRestart } from '@tools/flushDuelsAfterRestart'
import { restoreEnergyTimers } from '@tools/restoreEnergyTimers';



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
        await restoreEnergyTimers()
        await flushDuelsAfterRestart()
    })
    .then(() => {
        bot.on('text', textController)
        bot.on('callback_query', callbackQueryController)
        bot.on('inline_query', inlineQueryController)
    })