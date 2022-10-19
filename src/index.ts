import db from './db'
import bot from './bot'
import getInfo from './handlers/getInfo'
import getResources from './handlers/getResources'

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

bot.onText(/\/info/, getInfo)
bot.onText(/\/resources/, getResources)