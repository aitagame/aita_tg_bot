import { CallbackQuery } from "node-telegram-bot-api";
import redis from "@config/redis"
import bot from "@src/config/bot";
import { userData } from "@src/types/redisUserData";
import { sendAnswer } from "../../tools/sendActionAnswer";
import { createTask, TaskOptions } from "@tools/createActionTask";
import actionData from '@data/actions.json'

async function goToCaves(query: CallbackQuery) {
    const user_id = query.from.id
    const chat_id = query.message?.chat.id as number
    const message_id = query.message?.message_id as number
    const taskOptions: TaskOptions = {
        chat_id: chat_id,
        time: actionData.caves.time,
        user_id: user_id,
        action: 'caves'
    }

    const response = await redis.get(user_id.toString())

    if (!response) {        // If no data about user state
        createTask(taskOptions)
        return sendAnswer({ chat_id, message_id, query_id: query.id, action: 'caves' })
    }
    const redisData = JSON.parse(response) as userData  // Parse JSON from Redis

    if (redisData.state.action !== 'idle') {        // If already in action
        bot.answerCallbackQuery(query.id)
        return bot.sendMessage(chat_id, 'You already in adventure')
    }

    createTask(taskOptions)

    sendAnswer({ chat_id, message_id, query_id: query.id, action: 'caves' })
}

export default goToCaves