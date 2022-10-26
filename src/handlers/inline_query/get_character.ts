import { CallbackQuery, InlineKeyboardButton } from "node-telegram-bot-api"
import { characterInfoTemplate, CharInfoType } from "@handlers/commands/characterInfo/getinfo.template"
import bot from "@src/config/bot"
import { getPhotoByElement } from "@tools/getPhotoByElement"
import elements from '@data/elements.json'

import Characters from "@sql/charactersDB"

const getCharacter = async (query: CallbackQuery) => {
    const controller = new Characters()
    const chat_id = query.message?.chat.id as number
    const user_id = query.from.id as number

    const userData = await controller.readById(user_id)

    if (!userData) {
        return bot.answerCallbackQuery(query.id)
    }

    const charInfo: CharInfoType = {
        name: userData.name,
        level: userData.level,
        experience: userData.experience,
        maxLevelExperience: 1250,
        element_id: userData.element,
        armor: userData.armor,
        attack: userData.attack,
        crit_chance: userData.crit_chance,
        crit_multiplicator: userData.crit_damage,
        evade_chance: userData.evade_chance,
        loses: 0,
        wins: 0,
        rating: userData.rating
    }

    const filename = elements.find(item => item.id === charInfo.element_id)?.element as string

    const keyboard: Array<InlineKeyboardButton[]> = [
        [{ text: 'My character', callback_data: 'get_character' }, { text: 'Items', callback_data: 'get_items' }, { text: 'Actions', callback_data: 'get_actions' }]
    ]

    const replyText = characterInfoTemplate(charInfo)

    bot.answerCallbackQuery(query.id)


    const photo = await getPhotoByElement(charInfo.element_id)

    bot.sendPhoto(chat_id, photo, {
        caption: replyText,
        reply_to_message_id: query.message?.message_id,
        reply_markup: {
            inline_keyboard: keyboard,
            resize_keyboard: true
        }
    },
    {
        filename: filename,
        contentType: 'image/x-png'
    })


}

export default getCharacter