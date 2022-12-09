import elements from "@data/elements.json";

type CharInfoType = {
    name: string
    hp: number
    element_id: number
    level: number
    experience: number
    maxLevelExperience: number
    rating: number
    wins: number
    loses: number
    attack: number
    armor: number
    crit_chance: number
    crit_damage: number
    evade_chance: number
    energy: number
    max_energy: number
    refreshEnergy: number | null
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Template string for character info
 */

function characterInfoTemplate(charInfo: CharInfoType) {
    const {
        name,
        element_id,
        hp,
        armor,
        attack,
        crit_chance,
        crit_damage,
        evade_chance,
        experience,
        level,
        loses,
        rating,
        wins,
        maxLevelExperience,
        energy,
        max_energy,
        refreshEnergy
    } = charInfo

    const elementName = elements.find(item => item.id === element_id)?.element as string

    const totalBattles = loses + wins
    const percenteOfWins = ((wins / totalBattles) * 100)

    const timeToAddEnergy = refreshEnergy == null ? undefined : (((refreshEnergy - Date.now()) / 1000) / 60).toFixed(0)

    // template =>
    const template = `
${capitalizeFirstLetter(elementName)} ${name}\n
🏆 Level: ${level} XP: ${experience}/${maxLevelExperience}\n
🔋 Energy: ${energy}/${max_energy} (${timeToAddEnergy ? `+1🔋 in ${timeToAddEnergy} minutes` : ''})\n
🫀 HP: ${hp}
🗡 Attack: ${attack}
🛡 Defence: ${armor}
⚡️ Chance of critical: ${crit_chance}%
💥 Critical damage: x${crit_damage}
🍃 Chance of evade: ${evade_chance}\n
🏅 Rating: ${rating}
Wins: ${wins} Loses: ${loses} (${isNaN(percenteOfWins) ? 0 : percenteOfWins}%)\n`

    // =>

    return template
}

export { CharInfoType, characterInfoTemplate }