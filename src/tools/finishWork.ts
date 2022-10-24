import redis from '@config/redis'
import bot from '@src/config/bot'
import { userData } from '@src/types/redisUserData'

async function finishWork(user_id: number, chat_id: number, message: string) {
    const redisData = await redis.get(user_id.toString())

    if (!redisData) {
        return
    }

    const workStatus = JSON.parse(redisData) as userData

    if (workStatus.state.action !== 'idle') {
        return
    }

    const updateStatus = { ...workStatus }
    updateStatus.state.action = 'idle'
    updateStatus.state.start = null
    updateStatus.state.end = null

    redis.set(user_id.toString(), JSON.stringify(updateStatus))
    bot.sendMessage(chat_id, message)
}

export default finishWork