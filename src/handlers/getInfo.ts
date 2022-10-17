import { InlineKeyboardButton, KeyboardButton, Message } from "node-telegram-bot-api"
import { characterInfoTemplate, CharInfoType } from "../templates/characterInfo"
import bot from "../bot"
import { getPhotoByElement } from "../tools/getPhotoByElement"
import getRandom from '../tools/getRandomInt'

const getInfo = async (msg: Message) => {
    if (!msg.from) {
        throw new Error('Sender undefined')
    }

    const { id } = msg.chat
    const randomPhoto: ['fire', 'earth', 'wind'] = ['fire', 'earth', 'wind']

    const charInfo: CharInfoType = {
        name: msg.from.first_name,
        level: getRandom(0, 100),
        experience: getRandom(1, 1249),
        maxLevelExperience: 1250,
        char_class: randomPhoto[getRandom(0, 2)],
        armor: getRandom(10, 150),
        attack: getRandom(10, 150),
        crit_chance: getRandom(0, 100),
        crit_multiplicator: getRandom(0.2, 2.5),
        evade_chance: getRandom(0, 100),
        loses: getRandom(10, 150),
        wins: getRandom(10, 150),
        rating: getRandom(0, 6000)
    }

    const keyboard: Array<InlineKeyboardButton[]> = [
        [{ text: 'My character', callback_data: 'character' }, { text: 'Resources', callback_data: 'resources' }]
    ]

    const replyText = characterInfoTemplate(charInfo, msg.from.id)


    getPhotoByElement(randomPhoto[getRandom(0, 2)])
        .then(data => {
            bot.sendPhoto(id, data, {
                caption: replyText,
                reply_to_message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: keyboard,
                    resize_keyboard: true
                }
            })
        })



}

export default getInfo