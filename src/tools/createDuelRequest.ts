import redis from '@config/redis'
import { UserDataType } from '@src/types/redisUserData'
import { Message } from 'node-telegram-bot-api'
import { deleteDuelRequest } from './deleteDuelRequest'

export interface DuelRequestOtions {
    user_id: number
    chat_id: number
    oponent_user_id: number
    msg: Message
}

export async function createDuelRequest(options: DuelRequestOtions) {
    const { msg } = options
    const chat_id = msg.chat.id
    const user_id = msg.from?.id as number
    const oponent_user_id = msg.reply_to_message?.from?.id as number
    const userActionInfo = await redis.get(user_id.toString())

    const duelDuration = 1000 * 60 * 1
    const start = Date.now()
    const end = start + duelDuration

    const timeout = setTimeout(() => {
        deleteDuelRequest(msg)
    }, duelDuration) 

    const modifiedData: UserDataType = {
        user_id: user_id,
        chat_id: chat_id,
        state: {
            action: 'duel',
            start: start,
            end: end,
            oponent_user_id: oponent_user_id,
            timeoutId: null
        },
    }

    if (!userActionInfo) {
        return redis.set(user_id.toString(), JSON.stringify(modifiedData))
    }

    const userData = JSON.parse(userActionInfo) as UserDataType
    if (userData.state.action !== 'idle') {
        return
    }

    redis.set(user_id.toString(), JSON.stringify(modifiedData))
}