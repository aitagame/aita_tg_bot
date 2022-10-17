import fs from 'fs'
import path from 'path'

type ElementNameType = 'fire' | 'wind' | 'earth'

/**
 * Search and return needed photo in assets/
 * @param elementName {string} Name of element class (ex. 'fire')
 * @returns {Buffer} Image in Buffer type 
 */

async function getPhotoByElement(elementName: ElementNameType) {
    const imgPath = path.join('src/assets', `${elementName}.png`)

    const data = await fs.promises.readFile(imgPath)

    return data
}

export { ElementNameType, getPhotoByElement }