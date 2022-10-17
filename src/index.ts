import db from './db'
import bot from './bot'
import getInfo from './handlers/getInfo'
import getResources from './handlers/getResources'

// db.connect((err) => {
//     if (err) throw err

//     console.log('Connected to DB')
// })

bot.onText(/\/info/, getInfo)
bot.onText(/\/resources/, getResources)