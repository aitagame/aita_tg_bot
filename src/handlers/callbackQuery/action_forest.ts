import { CallbackQuery } from "node-telegram-bot-api";
import bot from "@src/config/bot";
import actionsData from '@data/actions.json'
import { sendAnswer } from "../../tools/actions/sendActionAnswer";
import { createTask, TaskOptions } from "@tools/createActionTask";
import { UserDataController } from "@tools/redisController";


async function goToForest(query: CallbackQuery) {
    const user_id = query.from.id as number
    const chat_id = query.message?.chat.id as number
    const message_id = query.message?.message_id as number
    const taskOptions: TaskOptions = {
        chat_id: chat_id,
        time: actionsData.forest.time,
        user_id: user_id,
        action: 'forest'
    }
    const user = new UserDataController(user_id)
    const userData = await user.get()

    if (userData.state.action !== 'idle') {        // If already in action
        bot.answerCallbackQuery(query.id)
        return bot.sendMessage(chat_id, 'You already in adventure')
    }

    createTask(taskOptions)
    sendAnswer({ chat_id, message_id, query_id: query.id, action: 'forest' })
}


export default goToForest