import bot from './bot'
import getInfo from './handlers/getInfo'



bot.onText(/\/info/, getInfo)