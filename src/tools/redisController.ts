import redis from '@src/config/redis'
import { Energy, StateAdventure, StateDuel, StateIdle, UserDataType } from '@src/types/redisUserData'
import gameConfig from '@data/game_config.json'

type ActionsType = StateAdventure | StateIdle | StateDuel

export class UserData {
    user_id!: number
    chat_id!: number
    state!: ActionsType
    energy!: Energy
    constructor(options: UserDataType) {
        Object.assign(this, options)
    }
}

export class UserDataController {
    user_id: number

    constructor(user_id: number) {
        this.user_id = user_id;
    }

    get(user_id = this.user_id): Promise<UserData> {
        return new Promise(async (resolve) => {
            const userData = await redis.get(user_id.toString())
            if (!userData) {
                const defaultUserData = new UserData({
                    user_id: user_id,
                    chat_id: 0,
                    state: {
                        action: 'idle',
                        start: null,
                        end: null
                    },
                    energy: {
                        current: gameConfig.energy_default_energy,
                        max: gameConfig.energy_default_max_energy,
                        refresh: null
                    }
                })
                this.update(defaultUserData)
                return resolve(defaultUserData)
            }
            const data: UserData = JSON.parse(userData)
            resolve(new UserData({ ...data }))
        })
    }

    update(data: UserData) {
        return new Promise<string | null>((resolve, reject) => {
            try {
                resolve(redis.set(this.user_id.toString(), JSON.stringify(data)))
            }
            catch (err) {
                reject(err)
            }
        })
    }

    updateState(state: ActionsType) {
        return new Promise<string | null>(async (resolve, reject) => {
            try {
                const userData = await this.get()
                const modifiedData = userData
                modifiedData.state = state

                this.update(modifiedData)
                    .then(resolve)

            }
            catch (err) {
                reject(err)
            }
        })
    }
}
