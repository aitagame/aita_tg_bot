import { UsersFromDB } from "@src/types/sqltypes";
import getRandomInt from "@tools/getRandomInt";

/**
 * Check if damage is critical
 * @param character User's character stats
 * @returns boolean
 */

export function isCriricalDamage(character: UsersFromDB) {
    return getRandomInt(0, 100) < character.crit_chance
}