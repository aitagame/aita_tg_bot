import actionsData from '@data/actions.json'

export interface StateAdventure {
    action: keyof typeof actionsData
    start: number
    end: number
}

export interface StateIdle {
    action: 'idle'
    start: null
    end: null
}

export interface StateDuel {
    action: 'duel'
    start: number
    end: number
    oponent_user_id: number
}

export type userData = {
    user_id: number
    chat_id: number
    state: StateAdventure | StateIdle | StateDuel
}

