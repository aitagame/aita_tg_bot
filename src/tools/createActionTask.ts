import redis from "@src/config/redis"
import { userData, StateAdventure } from "@src/types/redisUserData"
import finishWork from "./finishWork"


export type TaskOptions = {
    time: number
    user_id: number,
    chat_id: number,
    action: StateAdventure['action']
}

async function createTask(options: TaskOptions) {
    const { action, chat_id, time, user_id } = options
    const start = Date.now()
    const end = start + time


    const data: userData = {
        user_id: user_id,
        chat_id: chat_id,
        state: {
            action: action,
            start: start,
            end: end,
        }
    }

    redis.set(user_id.toString(), JSON.stringify(data))

    setTimeout(() => {
        finishWork(user_id)
    }, time);
}

export { createTask }