import redis from '@config/redis'
import bot from '@src/config/bot'
import { userData } from '@src/types/redisUserData'
import actionData from '@data/actions.json'
import getRandomInt from '@tools/getRandomInt'
import items from '@data/items.json'
import { ItemDB } from '@src/types/items'
import ItemsDBController from '@sql/itemsDB'

async function finishWork(user_id: number) {
    const redisData = await redis.get(user_id.toString())

    if (!redisData) {
        return
    }

    const workStatus = JSON.parse(redisData) as userData

    if (workStatus.state.action === 'idle') {
        return
    }

    // END OF WORK

    const modifiedStatus: userData = {
        chat_id: workStatus.chat_id,
        user_id: workStatus.user_id,
        state: {
            action: 'idle',
            start: null,
            end: null
        }
    }


    const results = actionData[workStatus.state.action].result
    const result = results[getRandomInt(0, results.length - 1)] // GET RANDOM RESULT OF CURRENT STATE

    const rewards: Array<ItemDB> = []
    const recievedExperience = getRandomInt(result.experience.min, result.experience.max) // GET EXPERIENCE FROM MIN TO MAX


    // CALCULATING CHANCE OF ITEM REWARD AND PUSH IT TO ARRAY
    result.loot.forEach(item => {
        const randomedValue = getRandomInt(0, 100)
        if (randomedValue < item.chance) {
            rewards.push(
                new ItemDB(item.item_id, getRandomInt(item.quantity.min, item.quantity.max))
            )
        }
    })

    // ===> WORK WITH TEXT
    const experienceMessage = `🎖 You recieved ${recievedExperience} XP!\n`
    const itemsListTemplate = rewards.map(reward => { // COMPARING REWARDS ARRAY TO SINGLE STRING

        const fullItem = items.find(item => {
            return item.item_id === reward.item_id
        })
        if (!fullItem) return 'Item undefined!'

        return `${fullItem.marker} ${fullItem.name} x${reward.quantity}.`

    }).join('\n')


    const rewardsMessage = rewards.length === 0 ? '' : `You found some items: \n${itemsListTemplate}`

    const finalMessage = result.message.concat('\n', experienceMessage, rewardsMessage)
    // ===> END OF TEXT WORKING
    

    redis.set(user_id.toString(), JSON.stringify(modifiedStatus))
    bot.sendMessage(workStatus.chat_id, finalMessage)
}

export default finishWork