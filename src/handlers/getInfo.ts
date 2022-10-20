import { InlineKeyboardButton, Message } from "node-telegram-bot-api"
import { characterInfoTemplate, CharInfoType } from "@templates/characterInfo"
import bot from "../bot"
import { getPhotoByElement } from "@tools/getPhotoByElement"
import getRandom from '@tools/getRandomInt'
import Characters from "../sql/character"

const getInfo = async (msg: Message) => {
    if (!msg.from) {
        throw new Error('Sender undefined')
    }

    const { id } = msg.chat

    const controller = new Characters()

    const userData = await controller.readById(msg.from.id)

    if (!userData) {
        return bot.sendMessage(msg.chat.id, 'You have not character. Type /start for create one.')
    }



    const charInfo: CharInfoType = {
        name: userData.name,
        level: userData.level,
        experience: userData.experience,
        maxLevelExperience: 1250,
        char_class: userData.form,
        armor: userData.armor,
        attack: userData.attack,
        crit_chance: userData.crit_chance,
        crit_multiplicator: userData.crit_damage,
        evade_chance: userData.evade_chance,
        loses: 0,
        wins: 0,
        rating: userData.rating
    }

    const keyboard: Array<InlineKeyboardButton[]> = [
        [{ text: 'My character', callback_data: 'character' }, { text: 'Resources', callback_data: 'resources' }]
    ]

    const replyText = characterInfoTemplate(charInfo, msg.from.id)


    getPhotoByElement(charInfo.char_class)
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