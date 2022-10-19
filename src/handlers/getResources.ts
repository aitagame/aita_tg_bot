import { Message } from "node-telegram-bot-api"
import { resourceTemplate, ResourceTemplateType } from "../templates/resources"
import bot from "../bot"

const getResources = async (msg: Message) => {
    if (!msg.from) {
        throw new Error('Sender undefined')
    }
    const { id } = msg.chat

    const resources: ResourceTemplateType = [{
        name: 'Stone',
        base_cost: 1,
        description: 'Very hard peace of rock',
        quantity: 255,
        marker: '🪨'
    },
    {
        name: 'Grass',
        base_cost: 1,
        description: 'Green and delicious',
        quantity: 15,
        marker: '🌿'
    },
    {
        name: 'Iron',
        base_cost: 14,
        description: 'Cold and hard',
        quantity: 5,
        marker: '🪨'
    },
    {
        name: 'Coal',
        base_cost: 3,
        description: 'Nice fuel',
        quantity: 26,
        marker: '🪨'
    }
    ]

    const replyText = resourceTemplate(resources)

            bot.sendMessage(id, replyText)



}

export default getResources