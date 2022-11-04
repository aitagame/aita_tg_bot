import { CallbackQuery, Message } from "node-telegram-bot-api";
import handlers from "./handlers";

function callbackQueryController(query: CallbackQuery) {

    const { getActions, getCharacter, getItems, goToCaves, goToForest, makeDuel, acceptDuel } = handlers.callbackQuerys


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
        case('make_duel'): {
            return makeDuel(query)
        }
        case('duel_accept'): {
            return acceptDuel(query)
        }

    }
}

export default callbackQueryController