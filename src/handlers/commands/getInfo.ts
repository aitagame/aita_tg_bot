import { InlineKeyboardButton, Message } from "node-telegram-bot-api"
import { characterInfoTemplate, CharInfoType } from "@handlers/templates/characterInfo"
import bot from "@src/config/bot"
import { getPhotoByElement } from "@tools/getPhotoByElement"
import elements from '@data/elements.json'

import Characters from "@sql/charactersDB"
import { getLevel, nextLevelExperience } from "@tools/levels"
import { Character } from "@src/classes/character"

const getInfo = async (msg: Message) => {
    const controller = new Characters()
    const chat_id = msg.chat.id

    if (!msg.from) {
        return console.error({
            error_message: 'Sender is undefined!',
            message: msg,
        })
    }

    const userData = await controller.readById(msg.from.id)

    if (!userData) {
        return bot.sendMessage(msg.chat.id, 'You have not character. Type /start for create one.')
    }

    const userCharacter = new Character(userData)

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


    const keyboard: Array<InlineKeyboardButton[]> = [
        [{ text: 'My character', callback_data: 'get_character' }, { text: 'Items', callback_data: 'get_items' }, { text: 'Actions', callback_data: 'get_actions' }]
    ]

    const filename = elements.find(item => item.id === charInfo.element_id)?.element as string

    const replyText = characterInfoTemplate(charInfo)

    const photo = await getPhotoByElement(charInfo.element_id)

    bot.sendPhoto(chat_id, photo, {
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