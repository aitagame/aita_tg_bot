import redis from "@src/config/redis";
import { EnergyController } from "./energyController";

async function restoreEnergyTimers() {
    const keys = await redis.keys('*')
    keys.forEach(async key => {
        const user_id = parseInt(key)
        const user = new EnergyController(user_id)
        const userData = await user.get()
        if (userData.energy.refresh === null) return
        setTimeout(() => {
            user.addEnergy()
        }, userData.energy.refresh - Date.now())
    })
}

export { restoreEnergyTimers }