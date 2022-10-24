import { CallbackQuery, Message } from "node-telegram-bot-api"
import { resourceTemplate } from "@handlers/commands/items/items.template"
import bot from "@src/config/bot"
import Characters from "@sql/character"

const getItems = async (query: CallbackQuery) => {
    const user_id = query.from.id as number
    const chat_id = query.message?.chat.id as number

    const charController = new Characters()

    const char = await charController.readById(user_id)

    if (!char) return bot.sendMessage(chat_id, 'You have no character. Type /start to get one.')

    const replyText = resourceTemplate(char.resources)
    bot.answerCallbackQuery(query.id, {
        text: ':)'
    })
    bot.sendMessage(chat_id, replyText)
}

export default getItems