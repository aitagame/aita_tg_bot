import getRandomInt from "@tools/getRandomInt"

export class Critical {
    private readonly baseDamage = 2
    private readonly baseChance = 5
    constructor() {
    }
    get chance() {
        return this.baseChance
    }
    get damage() {
        return this.baseDamage
    }

    isCritical() {
        return getRandomInt(0, 100) < this.chance
    }
}