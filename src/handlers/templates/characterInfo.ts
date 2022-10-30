import elements from "@data/elements.json";

type CharInfoType = {
    name: string,
    element_id: number,
    level: number,
    experience: number,
    maxLevelExperience: number,
    rating: number,
    wins: number,
    loses: number,
    attack: number,
    armor: number,
    crit_chance: number
    crit_multiplicator: number,
    evade_chance: number,
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
        armor,
        attack,
        crit_chance,
        crit_multiplicator,
        evade_chance,
        experience,
        level,
        loses,
        rating,
        wins,
        maxLevelExperience
    } = charInfo

    const elementName = elements.find(item => item.id === element_id)?.element as string

    const totalBattles = loses + wins
    let percenteOfWins = ((wins / totalBattles) * 100)

    if (isNaN(percenteOfWins)) {
        percenteOfWins = 0
    }

    // template =>

    const template = `
${capitalizeFirstLetter(elementName)} ${name}\n
🏆 Level: ${level} XP: ${experience}/${maxLevelExperience}\n
🗡Attack: ${attack}
🛡 Defence: ${armor}
⚡️ Chance of critical: ${crit_chance}
💥 Critical damage: x${crit_multiplicator}
🍃 Chance of evade: ${evade_chance}\n
🏅 Rating: ${rating}
Wins: ${wins} Loses: ${loses} (${percenteOfWins}%)\n`

    // =>

    return template
}

export { CharInfoType, characterInfoTemplate }