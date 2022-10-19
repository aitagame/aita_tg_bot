type Resource = {
    name: string
    description: string
    base_cost: number
    quantity: number
    marker: string
}

type ResourceTemplateType = Array<Resource>

function resourceTemplate(data: ResourceTemplateType) {

    const listArray = data.map(item => {
        return `${item.marker} ${item.name} x${item.quantity} 💰${item.base_cost}$\ndescription: ${item.description}`
    }).join('\n\n')

    return '📦Your resources:'.concat('\n', listArray)
}

export { ResourceTemplateType, resourceTemplate }