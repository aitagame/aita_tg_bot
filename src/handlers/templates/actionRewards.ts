import { ItemDB } from "@src/types/items"
import itemsData from '@data/items.json'
import { ActionResult } from "@src/types/actions"

function actionRewardsTemplate(rewards: Array<ItemDB>, recievedExperience: number, result: ActionResult) {
    const experienceMessage = `🎖 You recieved ${recievedExperience} XP!\n`
    const itemsListTemplate = rewards.map(reward => { // COMPARING REWARDS ARRAY TO SINGLE STRING

        const fullItem = itemsData.find(item => {
            return item.item_id === reward.item_id
        })
        if (!fullItem) return 'Item undefined!'

        return `${fullItem.marker} ${fullItem.name} x${reward.quantity}.`

    }).join('\n')


    const rewardsMessage = rewards.length === 0 ? '' : `You found some items: \n${itemsListTemplate}`

    return result.message.concat('\n', experienceMessage, rewardsMessage)
}

export { actionRewardsTemplate }