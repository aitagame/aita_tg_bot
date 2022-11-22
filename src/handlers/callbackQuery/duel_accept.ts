import { CallbackQuery } from "node-telegram-bot-api"
import bot from "@src/config/bot"
import { duelEvent } from "@tools/duels/duelEvent/duelEvent"
import { UserDataController } from "@tools/redisController"


/**
 * The function handles query duel_accept.
 * @param query Telegram query
 */

const acceptDuel = async (query: CallbackQuery) => {
    const senderUserId = query.from.id
    const duelistUserId = query.message?.reply_to_message?.from?.id as number

    const user = new UserDataController(duelistUserId)

    const duelistData = await user.get()
    if (!duelistData) return console.error({
        duelistData
    })

    if (duelistData.state.action !== 'duel_pending') {
        bot.answerCallbackQuery(query.id, { text: 'Time for duel was expired.' })
        return;
    }
    const { oponent_user_id: oponentUserId } = duelistData.state

    if (senderUserId !== oponentUserId) {
        bot.answerCallbackQuery(query.id)
        bot.answerCallbackQuery(
            query.id,
            {
                text: 'This request is not for you!'
            }
        )
        return;
    }

    bot.answerCallbackQuery(query.id)

    bot.sendMessage(query.message?.chat.id as number, 'Дуэль началась блин')

    bot.answerCallbackQuery(query.id)
    duelEvent(duelistUserId, oponentUserId, query.message?.chat.id as number)
}

export default acceptDuel