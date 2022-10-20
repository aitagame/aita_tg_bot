
/**
 * The function returns a random number between min and max
 */

const getRandomInt = (min: number = 0, max: number = 1) => {
    return Math.floor(min + Math.random() * (max - min + 1))
}

export default getRandomInt