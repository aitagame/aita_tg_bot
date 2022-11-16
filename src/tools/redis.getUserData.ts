import redis from "@src/config/redis";
import { UserDataType } from "@src/types/redisUserData";

async function getUserData(user_id: number) {
    const dataRow = await redis.get(user_id.toString())
    if (!dataRow) {
        return
    }
    const userData = JSON.parse(dataRow) as UserDataType

    return userData
}

export { getUserData }