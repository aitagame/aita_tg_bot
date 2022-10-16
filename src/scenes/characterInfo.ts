
type CharInfoType = {
    name: string,
    char_class: string,
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

function characterInfo(charInfo: CharInfoType) {
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

    const totalBattles = loses + wins // W45 L100 T145
    const percenteOfWins = ((wins / totalBattles) * 100 ).toPrecision(3)

    const head = `${char_class} ${name}\n`
    const levelInfo = `🏆Level: ${level} ${experience}/${maxLevelExperience}\n`
    const characteristics = `🗡Attack: ${attack}
🛡Defence: ${armor}
⚡️Chance of critical: ${crit_chance}
💥Critical damage: x${crit_multiplicator}
🍃Chance of evade: ${evade_chance}\n`
    const battles = `🏅Rating: ${rating}
Wins: ${wins} Loses: ${loses} (${percenteOfWins}%)\n`


    return head + levelInfo + characteristics + battles
}

export { CharInfoType, characterInfo }