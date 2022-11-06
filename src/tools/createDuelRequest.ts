import redis from '@config/redis'
import { userData } from '@src/types/redisUserData'

export interface DuelRequestOtions {
    user_id: number
    chat_id: number
    oponent_user_id: number
}

export function createDuelRequest(options: DuelRequestOtions) {
    const { user_id, chat_id, oponent_user_id } = options
    const userActionInfo = redis.get(user_id.toString())

    const start = Date.now()
    const end = start + (1000 * 60 * 5)

    const modifiedData: userData = {
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

    
}