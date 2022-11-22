import { Message } from "node-telegram-bot-api"
import { resourceTemplate } from "@handlers/templates/items"
import bot from "@src/config/bot"
import ItemsDBController from "@sql/itemsDB"

const getItems = async (msg: Message) => {
    if (!msg.from) return;

    const user_id = msg.from.id as number
    const chat_id = msg.chat.id as number

    const itemsController = new ItemsDBController()
    const UserInventory = await itemsController.readById(user_id)

    if (!UserInventory) return bot.sendMessage(chat_id, 'You have no character. Type /start to get one.')

    const replyText = resourceTemplate(UserInventory)
    bot.sendMessage(chat_id, replyText, {
        reply_to_message_id: msg.message_id,
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [[{ text: "<< Back", callback_data: 'get_character' }]]
        }
    })
}

export default getItems