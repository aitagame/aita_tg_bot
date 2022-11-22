import { Users } from "@src/types/sqltypes";
import getRandomInt from "@tools/getRandomInt";

/**
 * Check if damage is critical
 * @param character User's character stats
 * @returns boolean
 */

export function isCriricalDamage(character: Users) {
    return getRandomInt(0, 100) < character.crit_chance
}