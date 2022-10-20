import { CallbackQuery, Message } from "node-telegram-bot-api";
import getInfo from "./commands/getInfo";

function callbackQueryController(query: CallbackQuery) {
    switch (query.data) {
        case ('character'): {
            getInfo(query.message?.reply_to_message as Message)
        }
    }
}

export default callbackQueryController