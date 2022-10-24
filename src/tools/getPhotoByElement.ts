import fs from 'fs'
import path from 'path'
import { ElementType } from 'types/dataElement'
import elements from '@data/elements.json'

/**
 * Search and return needed photo in assets
 */

async function getPhotoByElement(element_id: number) {
    const elementName = elements.find(item => {
        return item.id === element_id
    })?.element as string

    const imgPath = path.join('src/assets', 'profilePhotos', `${elementName}.png`)

    const data = fs.createReadStream(imgPath)
    
    return data
}

export { getPhotoByElement }