import { CallbackQuery } from "node-telegram-bot-api";
import bot from "@src/config/bot";
import { sendAnswer } from "../../tools/actions/sendActionAnswer";
import { createTask, TaskOptions } from "@tools/createActionTask";
import actionData from '@data/actions.json'
import { UserDataController } from "@tools/redisController";


async function goToCaves(query: CallbackQuery) {
    const user_id = query.from.id
    const chat_id = query.message?.chat.id as number
    const message_id = query.message?.message_id as number
    const user = new UserDataController(user_id)
    const userData = await user.get()

    if (userData.state.action !== 'idle') {        // If already in action
        bot.answerCallbackQuery(query.id)
        return bot.sendMessage(chat_id, 'You already in adventure')
    }

    createTask(userData, 'caves')

    sendAnswer({ chat_id, message_id, query_id: query.id, action: 'caves' })
}

export default goToCaves