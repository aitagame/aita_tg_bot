import redis from "@src/config/redis"
import finishWork from "./finishWork"
import { userData } from 'types/redisUserData'

async function restoreTasks() {
    const keysList = await redis.keys('*')
    if (!keysList) {
        return
    }
    keysList.forEach(async (item) => {
        const response = await redis.get(item) as string
        const userData = JSON.parse(response) as userData

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