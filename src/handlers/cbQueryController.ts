import { CallbackQuery, Message } from "node-telegram-bot-api";
import commands from "./commands";

function callbackQueryController(query: CallbackQuery) {

        const reply_to_message = query.message?.reply_to_message as Message

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
    }
}

export default callbackQueryController