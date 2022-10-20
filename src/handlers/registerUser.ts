import getRandomInt from "@tools/getRandomInt"
import bot from "../bot"
import { Message, User } from "node-telegram-bot-api"
import Characters from "../sql/character"

async function registerUser(msg: Message) {
    const { id: chat_id } = msg.chat
    const { id: user_id, first_name } = msg.from as User

    const controller = new Characters()

    const user = await controller.readById(user_id)
    if (!user) {
        await controller.create({
            user_id: user_id,
            form: ['fire', 'earth', 'wind'][getRandomInt(0, 2)],
            name: first_name
        })

        return bot.sendMessage(chat_id, 'User created')
    } else {
        bot.sendMessage(chat_id, 'You already exist in system. Write /info ')
    }
}

export default registerUser