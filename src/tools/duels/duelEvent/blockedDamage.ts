/**
 * Calculating of damage reducing by resistances
 * @param attack Incoming damage
 * @param armor number of armor
 * @returns modified damage
 */

import { getPecrent } from "@tools/getPercent"

export function blockedDamage(attack: number, armor: number) {
    while (armor--) {
        attack -= Math.ceil(getPecrent(attack, 10))
    }
    return attack + 1
}