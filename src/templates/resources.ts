type Resource = {
    name: string
    description: string
    base_cost: number
    quantity: number
}

type ResourceTemplateType = Array<Resource>

function resourceTemplate(data: ResourceTemplateType) {

    const listArray = data.map(item => {
        return `🟣${item.name} x${item.quantity} 💰${item.base_cost}$
description: ${item.description}\n`
    }).join('')



    const template = '📦Your resources:' + '\n' + listArray

    return template
}

export { ResourceTemplateType, resourceTemplate }