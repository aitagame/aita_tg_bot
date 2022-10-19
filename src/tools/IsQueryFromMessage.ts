import { CallbackQuery } from "node-telegram-bot-api";

function isQueryFromReplyMessage(query: CallbackQuery) {
    if ('undefined' === typeof query.message ||
        'undefined' === typeof query.message.reply_to_message ||
        'undefined' === typeof query.message.reply_to_message.from) {
        return false
    }
    query.message.reply_to_message.from
    return true
}

export default isQueryFromReplyMessage