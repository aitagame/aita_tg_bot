export class Armor {
    private baseArmor = 1
    private armorPerLevel = 0.5
    private level: number
    constructor(level: number) {
        this.level = level
    }

    get armor() {
        return this.baseArmor + (this.armorPerLevel * this.level)
    }
}