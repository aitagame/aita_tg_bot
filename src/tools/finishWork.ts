import redis from '@config/redis'
import bot from '@src/config/bot'
import { userData } from '@src/types/redisUserData'
import actionData from '@data/actions.json'
import getRandomInt from '@tools/getRandomInt'
import itemsData from '@data/items.json'
import { ItemDB } from '@src/types/items'
import ItemsDBController from '@sql/itemsDB'
import Characters from '@sql/charactersDB'
import { actionRewardsTemplate } from '@handlers/templates/actionRewards'

async function finishWork(user_id: number) {
    const redisData = await redis.get(user_id.toString())

    if (!redisData) {
        return
    }

    const workStatus = JSON.parse(redisData) as userData

    const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>
    const availableActions = getKeys(actionData)
    const currentAction = availableActions.find(item => {
        return item === workStatus.state.action
    })

    if (!currentAction) {
        return
    }

    // END OF WORK

    const results = actionData[currentAction].result
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

    const CharacterController = new Characters()
    const ItemController = new ItemsDBController
    CharacterController.updateExperience(user_id, recievedExperience)

    rewards.forEach(item => {
        ItemController.addItem(user_id, item)
    })

    const modifiedStatus: userData = {
        chat_id: workStatus.chat_id,
        user_id: workStatus.user_id,
        state: {
            action: 'idle',
            start: null,
            end: null
        }
    }

    const rewardsTemplate = actionRewardsTemplate(rewards, recievedExperience, result) // * Create template of rewards

    redis.set(user_id.toString(), JSON.stringify(modifiedStatus))
    bot.sendMessage(workStatus.chat_id, rewardsTemplate)
}

export default finishWork