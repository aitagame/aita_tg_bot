import getRandomInt from "@tools/getRandomInt"
import bot from "@src/config/bot"
import { Message, User } from "node-telegram-bot-api"
import Characters from "@sql/character"
import getInfo from "../characterInfo/getInfo"

async function registerUser(msg: Message) {
    const dbCharacters = new Characters()

    const { id: chat_id } = msg.chat
    const { id: user_id, first_name } = msg.from as User

    const charatcter = await dbCharacters.readById(user_id)
    if (!charatcter) {
        await dbCharacters.create({
            user_id: user_id,
            element: getRandomInt(0, 2),
            name: first_name
        })
        return bot.sendMessage(chat_id, 'User created')
    } else {
        getInfo(msg)
    }
}

export default registerUser