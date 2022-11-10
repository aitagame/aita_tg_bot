export interface Balance {
    dark_crystals: number
    fire_crystals: number
    water_crystals: number
    death_crystals: number
    earth_crystals: number
    life_crystals: number
    wind_crystals: number
}

export interface Items {
    item_id: number
    quantity: number
}

export interface CharacterType {
    user_id: number
    registered: string
    name: string
    element: number
    rating: number
    skill_points: number
    experience: number
    clan: number | null
    attack: number
    armor: number
    crit_chance: number
    crit_damage: number
    evade_chance: number
}