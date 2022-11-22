import { RowDataPacket } from "mysql2"

export interface UsersFromDB extends RowDataPacket {
    user_id: number
    registered: Date
    name: string
    element: number
    rating: number
    skill_points: number
    experience: number
    clan: number
}