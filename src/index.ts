import './paths';
import db from './db'
import bot from './bot'
import getInfo from './handlers/getInfo'
import getResources from './handlers/getResources'
import isQueryFromReplyMessage from './tools/IsQueryFromMessage'

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

bot.onText(/((\/info)|My character)/, getInfo)
bot.onText(/(\/resources|Resources)/, getResources)

// end this feature

// bot.on('callback_query', (query) => {

//     if ('undefined' === typeof query.message?.reply_to_message?.from) throw new Error('Only messages available to handle')

    

//     if (query.message?.reply_to_message?.from?.id === query.from.id) {
//         bot.sendMessage(query.message.reply_to_message.chat.id, 'Да, кнопку нажал '.concat(query.from.first_name))
//     } else {
//         bot.sendMessage(query.message.reply_to_message.chat.id, 'А ты педик, '.concat(query.from.first_name))
//     }
// })