import { RowDataPacket } from "mysql2"

export interface Users extends RowDataPacket {
    user_id: number
    registered: Date
    name: string
    element: number
    rating: number
    skill_points: number
    experience: number
    clan: number
    armor: number
    attack: number
    crit_chance: number
    crit_damage: number
    evade_chance: number
}