import { InlineKeyboardButton, Message } from "node-telegram-bot-api"
import bot from "@src/config/bot"

import Characters from "@sql/character"

const actions = async (msg: Message) => {
    const controller = new Characters()
    const { id } = msg.chat

    if (!msg.from) {
        throw new Error('Sender undefined')
    }

    const userData = await controller.readById(msg.from.id)

    if (!userData) {
        return bot.sendMessage(msg.chat.id, 'You have not character. Type /start for create one.')
    }

    const keyboard: Array<InlineKeyboardButton[]> = [
        [{text: 'forest', callback_data:'action_forest'}, {text: "Caves", callback_data: 'action_caves'}]
    ]

    bot.sendMessage(id, 'Available actions:', {
        reply_to_message_id: msg.message_id,
        reply_markup: {
            inline_keyboard: keyboard,
            resize_keyboard: true
        }
    })

}

export default actions