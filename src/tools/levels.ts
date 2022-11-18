export function levelExperience(level: number) {
    return (level / 2) * (level + 1)
}

export function getLevel(exp: number) {
    return Math.floor(((-2) + Math.sqrt(4 + (32 * exp))) / 4)
}

export function nextLevelExperience(exp: number) {
    const currentLevel = getLevel(exp)
    return levelExperience(currentLevel + 1)
}