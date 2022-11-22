export class Health {
    private readonly baseHealth = 100
    private readonly hpPerLevel = 4
    private level: number
    constructor(level: number) {
        this.level = level
    }
    get hp() {
        return this.baseHealth + (this.level * this.hpPerLevel)
    }
}