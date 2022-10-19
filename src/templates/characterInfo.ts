import { ElementNameType } from "tools/getPhotoByElement"

type CharInfoType = {
    name: string,
    char_class: ElementNameType,
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
 * @param charInfo {CharInfoType} properties of character
 * @returns {string} Character info template string
 */

function characterInfoTemplate(charInfo: CharInfoType, userID: number) {
    const {
        name,
        char_class,
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


    const totalBattles = loses + wins
    const percenteOfWins = ((wins / totalBattles) * 100).toPrecision(3)

    // template =>

    const template = `
${userID}
${capitalizeFirstLetter(char_class)} ${name}\n
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