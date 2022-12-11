import { UserDataType, StateAdventure } from "@src/types/redisUserData"
import finishWork from "./actions/finishWork"
import { UserDataController } from "./redisController"
import actionsData from '@data/actions.json'
import { EnergyController } from "./energyController"


export type TaskOptions = {
    time: number
    user_id: number,
    chat_id: number,
    action: StateAdventure['action']
}

async function createTask(userData: UserDataType, action: StateAdventure['action']) {
    const user_id = userData.user_id
    const user = new UserDataController(user_id)
    const energy = new EnergyController(user_id)
    const actionDuration = actionsData[action].time
    const start = Date.now()
    const end = start + actionDuration

    userData.state.action = action
    userData.state.start = start
    userData.state.end = end

    user.update(userData)

    setTimeout(() => {
        finishWork(user_id)
    }, actionDuration);
    energy.decreaseEnergy()
}

export { createTask }