import { InlineKeyboardButton, Message } from "node-telegram-bot-api"
import { characterInfoTemplate, CharInfoType } from "@handlers/templates/characterInfo"
import bot from "@src/config/bot"
import { getPhotoByElement } from "@tools/getPhotoByElement"
import elements from '@data/elements.json'

import Characters from "@sql/charactersDB"

const getInfo = async (msg: Message) => {
    const controller = new Characters()
    const { id } = msg.chat

    if (!msg.from) {
        throw new Error('Sender undefined')
    }
    const userData = await controller.readById(msg.from.id)

    if (!userData) {
        return bot.sendMessage(msg.chat.id, 'You have not character. Type /start for create one.')
    }

    const charInfo: CharInfoType = {
        name: userData.name,
        level: 0,
        experience: userData.experience,
        maxLevelExperience: 1250,
        element_id: userData.element,
        armor: userData.armor,
        attack: userData.attack,
        crit_chance: userData.crit_chance,
        crit_damage: userData.crit_damage,
        evade_chance: userData.evade_chance,
        loses: 0,
        wins: 0,
        rating: userData.rating
    }


    const keyboard: Array<InlineKeyboardButton[]> = [
        [{ text: 'My character', callback_data: 'get_character' }, { text: 'Items', callback_data: 'get_items' }, { text: 'Actions', callback_data: 'get_actions' }]
    ]

    const filename = elements.find(item => item.id === charInfo.element_id)?.element as string

    const replyText = characterInfoTemplate(charInfo)

    const photo = await getPhotoByElement(charInfo.element_id)

    bot.sendPhoto(id, photo, {
        caption: replyText,
        reply_to_message_id: msg.message_id,
        reply_markup: {
            inline_keyboard: keyboard,
            resize_keyboard: true
        },

    }, {
        filename: filename,
        contentType: 'image/x-png',
    })

}

export default getInfo