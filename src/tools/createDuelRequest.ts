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

export function createDuelRequest(options: DuelRequestOtions) {
    const { user_id, chat_id, oponent_user_id, msg } = options
    const userActionInfo = redis.get(user_id.toString())
    const duelDuration = 1000 * 60 * 1
    const start = Date.now()
    const end = start + duelDuration

    const modifiedData: UserDataType = {
        user_id: user_id,
        chat_id: chat_id,
        state: {
            action: 'duel',
            start: start,
            end: end,
            oponent_user_id: oponent_user_id
        },
    }

    if (!userActionInfo) {
        redis.set(user_id.toString(), JSON.stringify(modifiedData))
    }

    setTimeout(() => {
        deleteDuelRequest(msg)
    }, duelDuration)

}