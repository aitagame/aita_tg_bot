import redis from '@config/redis'
import bot from '@src/config/bot'
import { userData } from '@src/types/redisUserData'

async function finishWork(user_id: number, message: string) {
    const redisData = await redis.get(user_id.toString())

    if (!redisData) {
        return
    }

    const workStatus = JSON.parse(redisData) as userData

    if (workStatus.state.action !== 'idle') {
        return
    }

    const modifiedStatus: userData = {
        chat_id: workStatus.chat_id,
        user_id: workStatus.user_id,
        state: {
            action: 'idle',
            start: null,
            end: null
        }
    }

    redis.set(user_id.toString(), JSON.stringify(modifiedStatus))
    bot.sendMessage(workStatus.chat_id, message)
}

export default finishWork