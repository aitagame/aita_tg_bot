import { Users } from "@src/types/sqltypes"
import { calculateFinalDamage } from "./calculateFinalDamage"

/**
 *  Simulation of battle process
 * @param duelist User's user_id who will fight
 * @param oponent User's user_id who will fight
 * @returns 
 */

export function simulateDuel(duelist: Users, oponent: Users) {
    const roundsMessages: string[] = []
    let duelist_hp = 100
    let oponent_hp = 100

    while (duelist_hp > 0 && oponent_hp > 0) {
        const duelistDamage = calculateFinalDamage(duelist, oponent)
        const oponentDamage = calculateFinalDamage(oponent, duelist)

        duelist_hp -= oponentDamage.damage
        oponent_hp -= duelistDamage.damage

        const currentHPLog = `${duelist.name} ${duelist_hp}❤️ | ${oponent.name} ${oponent_hp}❤️`
        const criticalLog = (name: string, extraDamage: number) => { return `⚡️ ${name} deal critical damage! (+${extraDamage})` }

        const duelistCritLog = duelistDamage.isCritical ? criticalLog(duelist.name, duelistDamage.critDamage) : undefined
        const oponentCritLog = oponentDamage.isCritical ? criticalLog(oponent.name, oponentDamage.critDamage) : undefined
        const finalMessage = [currentHPLog, duelistCritLog, oponentCritLog].filter(item => item).join('\n')
        roundsMessages.push(finalMessage)
    }
    const winner = duelist_hp > oponent_hp ? duelist.name : oponent.name
    return { roundsMessages, winner }
}
