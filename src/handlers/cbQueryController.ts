import { CallbackQuery, Message } from "node-telegram-bot-api";
import handlers from "./commands";

function callbackQueryController(query: CallbackQuery) {

    const { getActions, getCharacter, getItems, goToCaves, goToForest } = handlers.querys


    switch (query.data) {
        case ('get_character'): {
            return getCharacter(query)
        }
        case ('get_items'): {
            return getItems(query)
        }
        case ('get_actions'): {
            return getActions(query)
        }
        case ('action_forest'): {
            return goToForest(query)
        }
        case ('action_caves'): {
            return goToCaves(query)
        }
    }
}

export default callbackQueryController