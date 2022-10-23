import bot from "@src/config/bot";
import { CallbackQuery, Message } from "node-telegram-bot-api";
import commands from "./commands";
import goToForest from "./inline_query/action_forest";

function callbackQueryController(query: CallbackQuery) {

    const reply_to_message = query.message?.reply_to_message as Message

    console.log(query)

    switch (query.data) {
        case ('character'): {
            return commands.getInfo(reply_to_message)
        }
        case ('resources'): {
            return commands.getResources(reply_to_message)
        }
        case ('actions'): {
            return commands.actions(reply_to_message)
        }
        case ('action_forest'): {
            return goToForest(query)
        }
    }
}

export default callbackQueryController