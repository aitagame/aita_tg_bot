import fs from 'fs'
import path from 'path'

type ElementNameType = string

/**
 * Search and return needed photo in assets
 */

async function getPhotoByElement(elementName: ElementNameType) {
    const imgPath = path.join('src/assets','profilePhotos', `${elementName}.png`)

    const data = await fs.promises.readFile(imgPath)

    return data
}

export { ElementNameType, getPhotoByElement }