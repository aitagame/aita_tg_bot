import { UserDataType, StateAdventure } from "@src/types/redisUserData"
import finishWork from "./actions/finishWork"
import { UserDataController } from "./redisController"


export type TaskOptions = {
    time: number
    user_id: number,
    chat_id: number,
    action: StateAdventure['action']
}

async function createTask(options: TaskOptions) {
    const { action, chat_id, time, user_id } = options
    const user = new UserDataController(user_id)
    const start = Date.now()
    const end = start + time


    const data: UserDataType = {
        user_id: user_id,
        chat_id: chat_id,
        state: {
            action: action,
            start: start,
            end: end,
        }
    }

    user.update(data)

    setTimeout(() => {
        finishWork(user_id)
    }, time);
}

export { createTask }