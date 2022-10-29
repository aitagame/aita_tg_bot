import { CallbackQuery, InlineKeyboardButton } from "node-telegram-bot-api"
import bot from "@src/config/bot"

import Characters from "@sql/charactersDB"

const getActions = async (query: CallbackQuery) => {
    const controller = new Characters()
    const chat_id = query.message?.chat.id as number
    const user_id = query.from.id as number
    const keyboard: Array<InlineKeyboardButton[]> = [
        [{ text: 'Forest', callback_data: 'action_forest' }, { text: "Caves", callback_data: 'action_caves' }]
    ]
    
    const userData = await controller.readById(user_id)
    if (!userData) {
        return bot.sendMessage(chat_id, 'You have not character. Type /start for create one.')
    }


    bot.answerCallbackQuery(query.id)

    bot.sendMessage(chat_id, 'Available actions:', {
        reply_to_message_id: query.message?.message_id,
        reply_markup: {
            inline_keyboard: keyboard,
            resize_keyboard: true
        }
    })

}

export default getActions