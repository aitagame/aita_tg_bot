
import actionsData from '@data/actions.json'
import redis from '@src/config/redis'

interface StateAdventure {
    action: keyof typeof actionsData
    start: number
    end: number
}

interface StateIdle {
    action: 'idle'
    start: null
    end: null
}

interface StateDuel {
    action: 'duel_pending' | 'duel_battling'
    start: number
    end: number
    oponent_user_id: number
}

type ActionsType = StateAdventure | StateIdle | StateDuel

type UserDataOptions = { user_id: number, chat_id: number, state: ActionsType }

export class UserData {
    user_id!: number
    chat_id!: number
    state!: ActionsType
    constructor(options: UserDataOptions) {
        Object.assign(this, options)
    }
}


export class UserDataController {
    user_id!: number

    constructor(user_id: number) {
        this.user_id = user_id
    }

    get(): Promise<UserData> {
        return new Promise(async (resolve, reject) => {
            const userData = await redis.get(this.user_id.toString())
            if (!userData) return reject(new Error('User data is not defined!'))
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
