import { UserDataType } from '@src/types/redisUserData'
import { UserDataController } from '@tools/redisController'
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
    const duelist = new UserDataController(duelist_user_id)
    const oponent = new UserDataController(oponent_user_id)

    const duelDuration = 1000 * 30
    const start = Date.now()
    const end = start + duelDuration

    setTimeout(() => {
        deleteDuelRequest(msg)
    }, duelDuration)

    const duelistData = await duelist.get()
    const oponentData = await oponent.get()

    const newDuelistData: UserDataType = {
        ...duelistData,
        state: {
            action: 'duel_pending',
            oponent_user_id: oponent_user_id,
            start: start,
            end: end
        }
    }

    const newOponentData: UserDataType = {
        ...oponentData,
        state: {
            action: 'duel_pending',
            oponent_user_id: duelist_user_id,
            start: start,
            end: end
        }
    }

    duelist.update(newOponentData)
    oponent.update(oponentData)
}