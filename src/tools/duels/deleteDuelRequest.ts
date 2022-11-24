import bot from '@src/config/bot'
import { UserDataType } from '@src/types/redisUserData'
import { UserDataController } from '@tools/redisController'
import { Message } from 'node-telegram-bot-api'
import createMention from '../createMention'

async function deleteDuelRequest(msg: Message) {
    const duelist_user_id = msg.from?.id as number
    const oponent_user_id = msg.reply_to_message?.from?.id as number
    const duelist = new UserDataController(duelist_user_id)
    const oponent = new UserDataController(oponent_user_id)
    const deulistUserData = await duelist.get()
    const oponentUserData = await oponent.get()


    if (deulistUserData.state.action !== 'duel_pending' || oponentUserData.state.action !== 'duel_pending') return

    const duelist_modifiedData: UserDataType = {
        chat_id: deulistUserData.chat_id,
        user_id: deulistUserData.user_id,
        state: {
            action: 'idle',
            end: null,
            start: null
        }
    }

    const oponent_modifiedData: UserDataType = {
        chat_id: oponentUserData.chat_id,
        user_id: oponentUserData.user_id,
        state: {
            action: 'idle',
            end: null,
            start: null
        }
    };

    duelist.update(duelist_modifiedData)
    oponent.update(oponent_modifiedData)
    bot.sendMessage(deulistUserData.chat_id, `${createMention(msg.from?.first_name as string, duelist_user_id)}, The response time for the duel has expired.`, {
        parse_mode: 'Markdown'
    })
}

export { deleteDuelRequest }