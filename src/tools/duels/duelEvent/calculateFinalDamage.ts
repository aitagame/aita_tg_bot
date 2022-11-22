import { UsersFromDB } from "@src/types/sqltypes"
import { blockedDamage } from "./blockedDamage"
import { isCriricalDamage } from "./isCriticalDamage"

/**
 * 
 * @param character stats of user character
 * @param oponent stats of oponent character
 * @returns is critical damage, base damage and critical damage
 */



export function calculateFinalDamage(character: UsersFromDB, oponent: UsersFromDB) {
    let damage = blockedDamage(character.attack, oponent.armor)
    const isCritical = isCriricalDamage(character)
    if (isCritical) damage *= character.crit_damage
    const critDamage = damage / character.crit_damage

    return { isCritical, damage, critDamage }
}