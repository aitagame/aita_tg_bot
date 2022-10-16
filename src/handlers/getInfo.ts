import { Message } from "node-telegram-bot-api"
import { characterInfo, CharInfoType } from "../scenes/characterInfo"
import fs from 'fs'
import bot from "../bot"

const getInfo = (msg: Message) => {
    if (!msg.from) {
        throw new Error('Sender undefined')
    }
    const { id } = msg.from

    const charInfo: CharInfoType = {
        name: msg.from.first_name,
        level: 21,
        experience: 666,
        maxLevelExperience: 1250,
        char_class: 'Dark',
        armor: 25,
        attack: 35,
        crit_chance: 25,
        crit_multiplicator: 1.25,
        evade_chance: 10,
        loses: 131,
        wins: 164,
        rating: 3150
    }

    const replyText = characterInfo(charInfo)

    fs.readFile('src/assets/dark.jpg', (error, data) => {
        if (error) {
            throw error
        }
        bot.sendPhoto(id, data, {
            caption: replyText
        })
    })

}

export default getInfo