import { CallbackQuery } from "node-telegram-bot-api";
import redis from "@config/redis"
import bot from "@src/config/bot";

function goToForest(query: CallbackQuery) {
    const user_id = query.from.id as number
    const chat_id = query.message?.chat.id as number
    const message_id = query.message?.message_id as number

    const start = Date.now()
    const end = start + (1000 * 60 * 5)

    const data = JSON.stringify({
        action: 'forest',
        start: start,
        end: end
    })

    redis.set(user_id.toString(), data)

    bot.answerCallbackQuery({
        callback_query_id: query.id,
        text: 'Okay'
    })

    bot.sendMessage(chat_id, 'Your character is going to the forest. Good luck!', {
        reply_to_message_id: message_id
    })
}

export default goToForest