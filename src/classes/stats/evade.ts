import getRandomInt from "@tools/getRandomInt"

export class Evade {
    private readonly basicChance = 20
    private readonly equipBonus
    constructor(equipBonus?: number[]) {
        this.equipBonus = !equipBonus ? 0 : equipBonus.reduce((prev, current) => prev + current, 0)
    }

    isEvaded() {
        return getRandomInt(0, 100) < this.chance
    }

    get chance() {
        return this.basicChance + this.equipBonus
    }
}