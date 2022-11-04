import actionData from '@data/actions.json'


function actionsListTemplate() {
    const actionsInfoArray = []

    for (const [_, value] of Object.entries(actionData)) {
        const { description, name, time } = value
        const normalisedTime = Math.floor(time / (1000 * 60))
        const singleItem = `${name}\n${description} ${normalisedTime} minutes.\n`

        actionsInfoArray.push(singleItem)
    }

    return `Available actions:\n${actionsInfoArray.join('')}`
}

export { actionsListTemplate }