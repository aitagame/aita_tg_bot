import './paths';
import db from './db'
import bot from './bot'
import textController from '@handlers/textController';
import callbackQueryController from '@handlers/cbQueryController';

function startServer() {
    try {
        db.connect(() => {
            console.log('Connected to DB')
        })
    }
    catch (err) {
        throw err
    }
}

startServer()

bot.on('text', textController)
bot.on('callback_query', callbackQueryController)