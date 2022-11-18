import bot from '@src/config/bot'
import { UserDataType } from '@src/types/redisUserData'
import { UserDataController } from '@tools/redisController'
import { Message } from 'node-telegram-bot-api'
import createMention from '../createMention'

async function deleteDuelRequest(msg: Message) {
    const user_id = msg.from?.id as number
    const user = new UserDataController(user_id)
    const userData = await user.get()

    if (userData.state.action !== 'duel_pending') return

    const modifiedData: UserDataType = {
        chat_id: userData.chat_id,
        user_id: userData.user_id,
        state: {
            action: 'idle',
            end: null,
            start: null
        }
    }

    user.update(modifiedData)
    bot.sendMessage(userData.chat_id, `${createMention(msg.from?.first_name as string, user_id)}, The response time for the duel has expired.`, {
        parse_mode: 'Markdown'
    })
}

export { deleteDuelRequest }