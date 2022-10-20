import { Item } from 'types/items'

type ResourceTemplateType = Array<Item>

function resourceTemplate(data: ResourceTemplateType) {

    const listArray = data.map(item => {
        return `${item.marker} ${item.name} x${item.} 💰${item.base_cost}$\ndescription: ${item.description}`
    }).join('\n\n')

    return '📦Your resources:'.concat('\n', listArray)
}

export { ResourceTemplateType, resourceTemplate }