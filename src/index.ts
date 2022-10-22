import './paths';
import db from './config/db'
import bot from './config/bot'
import redis from './config/redis'
import textController from '@handlers/textController';
import callbackQueryController from '@handlers/cbQueryController';

function startServer() {
    try {
        db.connect(() => {
            console.log('Connected to DB')
        })
        bot.startPolling().then(_ => console.log('Bot started polling successfully'))
        redis.connect().then(() => {
            console.log('Redis connected')
        })
    }
    catch (err) {
        throw err
    }
}

startServer()

bot.on('text', textController)
bot.on('callback_query', callbackQueryController)