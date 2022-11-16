import redis from '@config/redis'
import bot from '@src/config/bot'
import { UserDataType } from '@src/types/redisUserData'
import { Message } from 'node-telegram-bot-api'
import createMention from '../createMention'

async function deleteDuelRequest(msg: Message) {
    const user_id = msg.from?.id as number
    const redisResponse = await redis.get(user_id.toString())

    if (!redisResponse) return

    const userData = JSON.parse(redisResponse) as UserDataType

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

    redis.set(user_id.toString(), JSON.stringify(modifiedData))
    bot.sendMessage(userData.chat_id, `${createMention(msg.from?.first_name as string, user_id)}, The response time for the duel has expired.`, {
        parse_mode: 'Markdown'
    })
}

export { deleteDuelRequest }