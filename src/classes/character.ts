import { UsersFromDB } from "@src/types/sqltypes"
import { getPecrent } from "@tools/getPercent"
import getRandomInt from "@tools/getRandomInt"
import { getLevel } from "@tools/levels"

class Health {
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

class Attack {
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

class Armor {
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

class Critical {
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

class Evade {
    chance = 0
    constructor() {
    }

    isEvaded() {
        return getRandomInt(0, 100) < this.chance
    }
}

export class Character {
    readonly user_id: number
    hp: number
    readonly name: string
    readonly element: number
    readonly rating: number
    readonly skill_points: number
    readonly experience: number
    readonly level: number
    readonly clan: number | null
    readonly attack: number
    readonly armor: number
    readonly critical: Critical
    readonly evade_chance: Evade

    constructor(userInfo: UsersFromDB) {
        const { clan, element, experience, name, rating, skill_points, user_id } = userInfo
        this.level = getLevel(experience)
        this.name = name
        this.element = element
        this.rating = rating
        this.skill_points = skill_points
        this.experience = experience
        this.clan = clan
        this.user_id = user_id
        this.hp = new Health(this.level).hp
        this.armor = new Armor(this.level).armor
        this.attack = new Attack(this.level).attack
        this.critical = new Critical()
        this.evade_chance = new Evade()
    }

    private blockIncomingDamage(attack: number) {
        let armor = Math.floor(this.armor)

        while (armor--) {
            attack -= Math.ceil(getPecrent(attack, 10))
        }

        return attack < 1 ? 1 : attack
    }

    getDamage(attack: number) {
        this.hp -= this.blockIncomingDamage(attack)
    }

    dealDamage() {
        let damage = this.attack
        const criticalDamage = damage * this.critical.damage
        const isCritical = this.critical.isCritical()
        if (isCritical) damage *= this.critical.damage

        return { damage, isCritical, criticalDamage}
    }

}