import { UsersFromDB } from "@src/types/sqltypes"
import { getPecrent } from "@tools/getPercent"
import { getLevel } from "@tools/levels"
import { Armor } from "./stats/armor"
import { Attack } from "./stats/attack"
import { Critical } from "./stats/critical"
import { Evade } from "./stats/evade"
import { Health } from "./stats/health"

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

        return { damage, isCritical, criticalDamage }
    }

}