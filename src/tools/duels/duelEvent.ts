import redis from "@src/config/redis"
import { CharacterType } from "@src/types/character"
import { UserDataType } from "@src/types/redisUserData"
import { Users } from "@src/types/sqltypes"

type CharInfoType = Users | CharacterType

async function duelEvent(duelistInfo: CharInfoType, oponentInfo: CharInfoType) {
    const duelistRedisData = await redis.get(duelistInfo.user_id.toString())
    if (!duelistRedisData) return
    const duelistData = JSON.parse(duelistRedisData) as UserDataType
    duelistData.state.action = 'idle'
    redis.set(duelistInfo.user_id.toString(), JSON.stringify(duelistData))
}

export { duelEvent }