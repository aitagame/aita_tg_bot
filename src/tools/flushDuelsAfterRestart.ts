import redis from "@src/config/redis";
import { UserDataController } from "./redisController";

async function flushDuelsAfterRestart() {
    const keys = await redis.keys('*')
    if (!keys) return;

    keys.forEach(async item => {
        const user = new UserDataController(parseInt(item))
        const userData = await user.get()
        if (userData.state.action !== 'duel_battling' && userData.state.action !== 'duel_pending') return;
        userData.state = {
            action: 'idle',
            end: null,
            start: null
        }
        user.update(userData)
    })
}

export { flushDuelsAfterRestart }