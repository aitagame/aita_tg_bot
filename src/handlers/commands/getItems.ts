import { Message } from "node-telegram-bot-api"
import { resourceTemplate } from "@handlers/templates/items"
import bot from "@src/config/bot"
import Characters from "@sql/charactersDB"

const getItems = async (msg: Message) => {
    if (!msg.from) {
        throw new Error('Sender undefined')
    }
    const { id } = msg.chat

    const charController = new Characters()

    const char = await charController.readById(msg.from.id)

    if (!char) return bot.sendMessage(msg.chat.id, 'You have no character. Type /start to get one.')

    const replyText = resourceTemplate(char.resources)

    bot.sendMessage(id, replyText)
}

export default getItems