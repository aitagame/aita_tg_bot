import redis from '@config/redis'
import { UserDataType } from '@src/types/redisUserData'
import { getUserData } from '@tools/redis.getUserData'
import { Message } from 'node-telegram-bot-api'
import { deleteDuelRequest } from './deleteDuelRequest'

export interface DuelRequestOtions {
    msg: Message
}

export async function createDuelRequest(options: DuelRequestOtions) {
    const { msg } = options
    const chat_id = msg.chat.id
    const duelist_user_id = msg.from?.id as number
    const oponent_user_id = msg.reply_to_message?.from?.id as number
    const duelistActionInfo = await getUserData(duelist_user_id)
    const oponentActionInfo = await getUserData(oponent_user_id)

    const duelDuration = 1000 * 30
    const start = Date.now()
    const end = start + duelDuration

    setTimeout(() => {
        deleteDuelRequest(msg)
    }, duelDuration)

    const duelistData: UserDataType = {
        user_id: duelist_user_id,
        chat_id: chat_id,
        state: {
            action: 'duel_pending',
            start: start,
            end: end,
            oponent_user_id: oponent_user_id,
        },
    }

    const oponentData: UserDataType = {
        user_id: oponent_user_id,
        chat_id: chat_id,
        state: {
            action: 'duel_pending',
            start: start,
            end: end,
            oponent_user_id: duelist_user_id
        }
    }

    if (!duelistActionInfo) {
        return redis.set(duelist_user_id.toString(), JSON.stringify(duelistData))
    }

    if (!oponentActionInfo) {
        return redis.set(duelist_user_id.toString(), JSON.stringify(duelistData))
    }

    redis.set(duelist_user_id.toString(), JSON.stringify(duelistData))
    redis.set(oponent_user_id.toString(), JSON.stringify(oponentData))
}