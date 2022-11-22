export class Attack {
    private baseAttack = 10
    private attackPerLevel = 3.5
    private level: number
    constructor(level: number) {
        this.level = level
    }

    get attack() {
        return this.baseAttack + (this.level * this.attackPerLevel)
    }
}