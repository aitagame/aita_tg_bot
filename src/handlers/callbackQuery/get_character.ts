import { CallbackQuery, InlineKeyboardButton } from "node-telegram-bot-api"
import { characterInfoTemplate, CharInfoType } from "@handlers/templates/characterInfo"
import bot from "@src/config/bot"
import { getPhotoByElement } from "@tools/getPhotoByElement"
import elements from '@data/elements.json'

import Characters from "@sql/charactersDB"
import { nextLevelExperience } from "@tools/levels"
import { Character } from "@src/classes/character"

const getCharacter = async (query: CallbackQuery) => {
    const controller = new Characters()
    const chat_id = query.message?.chat.id as number
    const user_id = query.from.id as number

    const User = await controller.readById(user_id)

    if (!User) {
        return bot.answerCallbackQuery(query.id)
    }

    const userCharacter = new Character(User)

    const charInfo: CharInfoType = {
        armor: userCharacter.armor,
        hp: userCharacter.hp,
        attack: userCharacter.attack,
        crit_chance: userCharacter.critical.chance,
        crit_damage: userCharacter.critical.damage,
        element_id: userCharacter.element,
        evade_chance: userCharacter.evade_chance.chance,
        experience: userCharacter.experience,
        level: userCharacter.level,
        loses: 0,
        wins: 0,
        maxLevelExperience: nextLevelExperience(userCharacter.experience),
        name: userCharacter.name,
        rating: userCharacter.rating
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