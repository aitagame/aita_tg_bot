import getInfo from './commands/getInfo'
import getResources from './commands/getItems'
import registerUser from './commands/registerUser'
import actions from './commands/listActions'
import goToCaves from '@handlers/callbackQuery/action_caves'
import goToForest from '@handlers/callbackQuery/action_forest'
import getActions from '@handlers/callbackQuery/get_actions'
import getCharacter from '@handlers/callbackQuery/get_character'
import getItems from '@handlers/callbackQuery/get_items'
import makeDuel from './callbackQuery/duel_accept'
import { makeDuel as inlineDuel } from './inlineQuery/make_duel'
import acceptDuel from './callbackQuery/duel_accept'
import makeDuelText from './commands/makeDuel'


const commands = {
    getInfo,
    getResources,
    registerUser,
    actions,
    makeDuelText
}

const callbackQuerys = {
    goToCaves,
    goToForest,
    getActions,
    getCharacter,
    getItems,
    makeDuel,
    acceptDuel
}

const inlineQuerys = {
    inlineDuel
}

const handlers = {
    commands,
    callbackQuerys,
    inlineQuerys
}

export default handlers