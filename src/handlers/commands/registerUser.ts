import getRandomInt from "@tools/getRandomInt"
import bot from "@src/config/bot"
import { Message, User } from "node-telegram-bot-api"
import Characters from "@sql/charactersDB"
import getInfo from "./getInfo"
import redis from "@src/config/redis"
import { UserDataType } from "@src/types/redisUserData"

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

        const defaultUserData: UserDataType = {
            state: {
                action: 'idle',
                end: null,
                start: null
            },
            user_id: user_id,
            chat_id: msg.chat.id
        }

        await redis.set(user_id.toString(), JSON.stringify(defaultUserData))

        return bot.sendMessage(chat_id, 'User created')
    } else return getInfo(msg)

}

export default registerUser