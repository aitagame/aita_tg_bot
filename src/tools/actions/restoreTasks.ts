import redis from "@src/config/redis"
import finishWork from "./finishWork"
import { UserDataController } from "@tools/redisController"

async function restoreTasks() {
    const keysList = await redis.keys('*')
    if (!keysList) {
        return
    }
    keysList.forEach(async (item) => {
        const user = new UserDataController(parseInt(item))
        const userData = await user.get()
        if (userData.state.action === 'idle' || userData.state.start === null || userData.state.end === null) {
            return
        }

        const elapsedTime = userData.state.end - Date.now()

        setTimeout(() => {
            finishWork(userData.user_id)
        }, elapsedTime)
    })
}

export default restoreTasks