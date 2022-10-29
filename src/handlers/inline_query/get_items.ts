import { CallbackQuery } from "node-telegram-bot-api"
import { resourceTemplate } from "@handlers/templates/items"
import bot from "@src/config/bot"
import ItemsDBController from "@sql/itemsDB"

const getItems = async (query: CallbackQuery) => {
    const user_id = query.from.id as number
    const chat_id = query.message?.chat.id as number
    console.log(query)

    const itemsController = new ItemsDBController()
    const UserInventory = await itemsController.readById(user_id)
    console.log('USER_ID: ', user_id, UserInventory)

    if (!UserInventory) return bot.sendMessage(chat_id, 'You have no character. Type /start to get one.')

    const replyText = resourceTemplate(UserInventory)
    bot.answerCallbackQuery(query.id)
    bot.sendMessage(chat_id, replyText)
}

export default getItems