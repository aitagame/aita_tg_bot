
/**
 * The function returns a random number between min and max
 * 
 * @param min {number} Minimum return value 
 * @param max {number} The maximum value of the returned number
 * @returns {number} Random number
 */

const getRandomInt = (min: number = 0, max: number = 1) => {
    return Math.floor(min + Math.random() * (max - min + 1))
}

export default getRandomInt