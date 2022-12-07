import bot from '@src/config/bot'
import actionData from '@data/actions.json'
import getRandomInt from '@tools/getRandomInt'
import { ItemDB } from '@src/types/items'
import ItemsDBController from '@sql/itemsDB'
import Characters from '@sql/charactersDB'
import { actionRewardsTemplate } from '@handlers/templates/actionRewards'
import { UserDataController } from '@tools/redisController'

async function finishWork(user_id: number) {
    const user = new UserDataController(user_id)
    const userData = await user.get()

    if (!userData) {
        return
    }

    const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>
    const availableActions = getKeys(actionData)
    const currentAction = availableActions.find(item => {
        return item === userData.state.action
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


    // *MODIFIYNG USER DATA


    userData.state.action = 'idle'
    userData.state.start = null
    userData.state.end = null

    const rewardsTemplate = actionRewardsTemplate(rewards, recievedExperience, result) // * Create template of rewards

    user.update(userData)
    bot.sendMessage(userData.chat_id, rewardsTemplate)
}

export default finishWork