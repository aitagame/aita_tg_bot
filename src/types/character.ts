import { RowDataPacket } from "mysql2"

export interface Balance {
    dark_crystals: number
    fire_crystals: number
    water_crystals: number
    death_crystals: number
    earth_crystals: number
    life_crystals: number
    wind_crystals: number
}

export interface Resource {
    name: string
    amount: number
    base_cost: number
}

export interface CharacterType extends RowDataPacket {
    user_id: number
    registered: string
    name: string
    form: string
    level: number
    rating: number
    skill_points: number
    experience: number
    attack: number
    armor: number
    crit_chance: number
    crit_damage: number
    evade_chance: number
    clan: number | null
    balance: Balance,
    resources: Array<Resource>
}