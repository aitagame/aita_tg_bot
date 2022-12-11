import GameItems from '@data/items.json'
import { ItemDB, ItemFull } from '@src/types/items'

type ResourceTemplateType = Array<ItemDB>

function resourceTemplate(itemsArray: ResourceTemplateType) {

    if (!itemsArray || itemsArray.length === 0) return 'You have no resources'

    const fullItemList = itemsArray.map(item => {
        const fullItem = GameItems.find(singleItem => item.item_id === singleItem.item_id)
        return { ...fullItem!, quantity: item.quantity }    //! non-null assertion operator!!!
    })

    const template = fullItemList.map(item => {
        return `${item.marker} ${item.name} x${item.quantity}\n${item.description} ${item.can_use ? `/use_${item.item_id}` : ''}`
    })

    return ''.concat('Your resources: \n', template.join('\n\n'))
}

export { ResourceTemplateType, resourceTemplate }