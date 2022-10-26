
interface Result {
    message: string,
    loot: Array<LootType>,
    experience: RangedValue
}

interface LootType {
    item_id: number,
    chance: number,
    quantity: RangedValue
}

interface RangedValue {
    min: number,
    max: number
}

interface LocationAction {
    go_message: string,
    time: number,
    result: Array<Result>
}

type ActionsType = {
    [key: string]: LocationAction
}

export { ActionsType, LocationAction, RangedValue, LootType, Result }