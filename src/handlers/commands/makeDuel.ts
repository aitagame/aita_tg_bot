import { makeDuelTemplate, DuelTemplateType } from "@handlers/templates/makeDuel";
import bot from "@src/config/bot";
import { InlineKeyboardMarkup, Message } from "node-telegram-bot-api";

function makeDuel(msg: Message) {
  if (!msg.reply_to_message) {
    return bot.sendMessage(msg.chat.id, 'In order to start a duel, you must write "Duel" in reply to the opponent\'s message. ')
  }
  const chat_id = msg.chat.id

  const duelist = msg.from as Message['from']
  const oponent = msg.reply_to_message.from as Message['from']

  const templateOptions: DuelTemplateType = {
    duelist: {
      name: duelist?.first_name as string,
      user_id: duelist?.id as number
    },
    oponent: {
      name: oponent?.first_name as string,
      user_id: oponent?.id as number
    }
  }

  const duelText = makeDuelTemplate(templateOptions)

  const buttons: InlineKeyboardMarkup['inline_keyboard'] = [
    [{ text: '✅ Accept', callback_data: 'duel_accept' }, { text: '❌ Decline', callback_data: 'duel_decline' }],
    [{ text: '❔ Get info about my oponent', callback_data: 'duel_getInfo' }]
  ]

  bot.sendMessage(chat_id, duelText, {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: buttons
    },
    parse_mode: 'Markdown'
  })
}

export default makeDuel