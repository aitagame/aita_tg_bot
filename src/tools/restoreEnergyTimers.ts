import redis from "@src/config/redis";
import { UserDataController } from "./redisController";

async function restoreEnergyTimers() {
    const keys = await redis.keys('*')
    keys.forEach(async key => {
        const user_id = parseInt(key)
        const user = new UserDataController(user_id)
        const userData = await user.get()
        if (userData.energy.refresh === null) return
        setTimeout(() => {
            user.addEnergy()
        }, userData.energy.refresh - Date.now())
    })
}

export { restoreEnergyTimers }