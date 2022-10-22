import GameItems from '@data/items'
import { Items } from "@src/types/character"

type ResourceTemplateType = Array<Items>

function resourceTemplate(itemsArray: ResourceTemplateType) {

    if (!itemsArray || itemsArray.length === 0) return 'You have no resources'

    const fullItemList = itemsArray.map(item => {
        const fullItem = GameItems.find(singleItem => item.item_id === singleItem.item_id)
        return { ...fullItem, quantity: item.quantity }
    })

    const template = fullItemList.map(item => {
        return `${item.marker} ${item.name} x${item.quantity}\n${item.description} ${item.can_use ? `/use_${item.item_id}` : ''}`
    })

    return ''.concat('Your resources: \n', template.join('\n\n'))
}

export { ResourceTemplateType, resourceTemplate }