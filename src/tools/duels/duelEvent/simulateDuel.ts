import { Character } from "@src/classes/character"

/**
 *  Simulation of battle process
 * @param duelist User's user_id who will fight
 * @param oponent User's user_id who will fight
 * @returns 
 */

export function simulateDuel(duelist: Character, oponent: Character) {
    const roundsMessages: string[] = []

    while (duelist.hp > 0 && oponent.hp > 0) {
        const duelistDamage = duelist.dealDamage()
        const oponentDamage = oponent.dealDamage()

        const duelistIntoDamageInfo = duelist.getDamage(oponentDamage.damage)
        const oponentIntoDamageInfo = oponent.getDamage(duelistDamage.damage)

        const currentHPLog = `${duelist.name} ${duelist.hp}❤️ | ${oponent.name} ${oponent.hp}❤️`
        const criticalLog = (name: string, extraDamage: number) => { return `⚡️ ${name} deal critical damage! (+${extraDamage})` }
        const evadeLog = (name: string) => `${name} was evaded damage!`

        const duelistEvadeLog = duelistIntoDamageInfo.isEvaded ? evadeLog(duelist.name) : undefined
        const oponentEvadeLog = oponentIntoDamageInfo.isEvaded ? evadeLog(duelist.name) : undefined
        const duelistCritLog = duelistDamage.isCritical ? criticalLog(duelist.name, duelistDamage.criticalDamage) : undefined
        const oponentCritLog = oponentDamage.isCritical ? criticalLog(oponent.name, oponentDamage.criticalDamage) : undefined
        const finalMessage = [currentHPLog, duelistCritLog, oponentCritLog, duelistEvadeLog, oponentEvadeLog].filter(item => item).join('\n')
        roundsMessages.push(finalMessage)
    }
    const winner = duelist.hp > oponent.hp ? duelist.name : oponent.name
    return { roundsMessages, winner }
}
