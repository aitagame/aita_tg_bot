import redis from '@config/redis'
import bot from '@src/config/bot'
import { actionStatus } from '@src/types/redisActionStatus'

async function finishWork(user_id: number, chat_id: number, message: string) {
    const redisData = await redis.get(user_id.toString())

    if (!redisData) {
        return
    }

    const workStatus = JSON.parse(redisData) as actionStatus

    if (workStatus.end > Date.now()) {
        return 
    }

    redis.del(user_id.toString())
    bot.sendMessage(chat_id, message)
}

export default finishWork