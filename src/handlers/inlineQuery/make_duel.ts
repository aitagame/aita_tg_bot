/*
    !!! MAYBE THIS NODE WILL BE DELETED.  
    * Will be cool if this will work.
*/
// import { characterInfoTemplate, CharInfoType } from "@handlers/templates/characterInfo"
// import Characters from "@sql/charactersDB"
// import bot from "@src/config/bot"
import { InlineQuery } from "node-telegram-bot-api"


const makeDuel = async (query: InlineQuery) => {}
//     console.log(query)
//     const Users = new Characters()
//     const userData = await Users.readById(query.from.id)
//     if (!userData) return bot.answerInlineQuery(query.id, [])

//     const {
//         armor,
//         attack,
//         crit_chance,
//         crit_damage,
//         element,
//         evade_chance,
//         experience,
//         name,
//         rating,
//     } = userData

//     const charInfo: CharInfoType = {
//         armor,
//         attack,
//         crit_chance,
//         crit_damage,
//         element_id: element,
//         evade_chance,
//         experience,
//         level: 1,
//         loses: 0,
//         wins: 0,
//         maxLevelExperience: 150,
//         name,
//         rating
//     }
//     const stats = characterInfoTemplate(charInfo)
//     const messageText = `${stats}

// I challenge you to fight!`
//     bot.answerInlineQuery(query.id, [{
//         type: 'article', id: '1', input_message_content: {
//             message_text: messageText,
//         },
//         description: 'With this button you can fight with someone',
//         reply_markup: {
//             inline_keyboard: [[{ text: 'Accept', callback_data: 'duel_accept' }, { text: 'Decline', callback_data: 'duel_decline' }]],
//         },
//         title: 'Make duel',
//     }], {
//         cache_time: 0,
//         is_personal: true
//     })
// }

export { makeDuel }