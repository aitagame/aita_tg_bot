import { makeDuelTemplate, DuelTemplateType } from "@handlers/templates/makeDuel";
import Characters from "@sql/charactersDB";
import bot from "@src/config/bot";
import { InlineKeyboardMarkup, Message } from "node-telegram-bot-api";

async function makeDuel(msg: Message) {
  if (!msg.reply_to_message) {
    return bot.sendMessage(msg.chat.id, 'In order to start a duel, you must write "Duel" in reply to the opponent\'s message. ')
  }
  const chat_id = msg.chat.id

  const users = new Characters()

  const duelistFrom = msg.from as Message['from']
  const oponentFrom = msg.reply_to_message.from as Message['from']

  const duelistInfo = await users.readById(duelistFrom?.id as number)
  const oponentInfo = await users.readById(oponentFrom?.id as number)

  if (!duelistInfo || !oponentInfo) return bot.sendMessage(chat_id, 'You or your opponent does not have a character in the game', {
    reply_to_message_id: msg.message_id
  })

  const templateOptions: DuelTemplateType = {
    duelist: {
      name: duelistFrom?.first_name as string,
      user_id: duelistFrom?.id as number
    },
    oponent: {
      name: oponentFrom?.first_name as string,
      user_id: oponentFrom?.id as number
    }
  }

  const duelText = makeDuelTemplate(templateOptions)

  const buttons: InlineKeyboardMarkup['inline_keyboard'] = [
    [{ text: '✅ Accept', callback_data: 'duel_accept' }, { text: '❌ Decline', callback_data: 'duel_decline' }],
    [{ text: '📖 Get info about my oponent', callback_data: 'duel_getInfo' }]
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