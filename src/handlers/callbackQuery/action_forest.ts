import { CallbackQuery } from "node-telegram-bot-api";
import bot from "@src/config/bot";
import { sendAnswer } from "../../tools/actions/sendActionAnswer";
import { createTask, TaskOptions } from "@tools/createActionTask";
import { UserDataController } from "@tools/redisController";


async function goToForest(query: CallbackQuery) {
    const user_id = query.from.id as number
    const chat_id = query.message?.chat.id as number
    const message_id = query.message?.message_id as number
    const user = new UserDataController(user_id)
    const userData = await user.get()

    if (userData.state.action !== 'idle') {        // If already in action
        bot.answerCallbackQuery(query.id)
        return bot.sendMessage(chat_id, 'You already in adventure')
    }

    if(userData.energy.current === 0) {             // If no energy
        bot.answerCallbackQuery(query.id)
        return bot.sendMessage(chat_id, 'You have no energy now')
    }

    userData.chat_id = query.message?.chat.id as number     //* Write message chat id to reply 
    await user.update(userData)                             //*
    
    createTask(userData, 'forest')
    sendAnswer({ chat_id, message_id, query_id: query.id, action: 'forest' })

    user.decreaseEnergy()

}


export default goToForest