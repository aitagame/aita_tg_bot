import getRandomInt from "@tools/getRandomInt"

export class Evade {
    chance = 0
    constructor() {
    }

    isEvaded() {
        return getRandomInt(0, 100) < this.chance
    }
}