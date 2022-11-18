import { CallbackQuery, InlineKeyboardButton } from "node-telegram-bot-api"
import { characterInfoTemplate, CharInfoType } from "@handlers/templates/characterInfo"
import bot from "@src/config/bot"
import { getPhotoByElement } from "@tools/getPhotoByElement"
import elements from '@data/elements.json'

import Characters from "@sql/charactersDB"
import { getLevel, nextLevelExperience } from "@tools/levels"

const getCharacter = async (query: CallbackQuery) => {
    const controller = new Characters()
    const chat_id = query.message?.chat.id as number
    const user_id = query.from.id as number

    const userData = await controller.readById(user_id)

    if (!userData) {
        return bot.answerCallbackQuery(query.id)
    }

    const {
        armor,
        attack,
        crit_chance,
        crit_damage,
        element,
        evade_chance,
        experience,
        name,
        rating,
    } = userData

    const charInfo: CharInfoType = {
        armor,
        attack,
        crit_chance,
        crit_damage,
        element_id: element,
        evade_chance,
        experience,
        level: getLevel(experience),
        loses: 0,
        wins: 0,
        maxLevelExperience: nextLevelExperience(experience),
        name,
        rating
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