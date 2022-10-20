import { CallbackQuery, Message } from "node-telegram-bot-api";
import commands from "./commands";

function callbackQueryController(query: CallbackQuery) {
    switch (query.data) {
        case ('character'): {
            return commands.getInfo(query.message?.reply_to_message as Message)
        }
        case ('resources'): {
            return commands.getResources(query.message?.reply_to_message as Message)
        }
    }
}

export default callbackQueryController