import { CallbackQuery } from "node-telegram-bot-api"
import bot from "@src/config/bot"
import redis from "@src/config/redis"
import { UserDataType } from "@src/types/redisUserData"
import createMention from "@tools/createMention"
import { duelEvent } from "@tools/duels/duelEvent"
import Characters from "@sql/charactersDB"
import { getUserData } from "@tools/redis.getUserData"

/* 
    TODO: 1. Обработать случай принятия дуэли и отмены дуэли
    TODO: 2. Обработать случай приватной или публичной дуэли (основываясь на наличии реплая)
    TODO: 3. Игнорить тех, кто  нажал на кнопку не предназначенную ему
    TODO: 4. Отработать кейс, если дуэль была отправлена самому себе
    // ? Нужен ли шаблонизатор здесь?
    ! Будет локализация.
    
    * Вызываемый не может быть ботом.
    * У вызываемого должен быть аккаунт в боте.
*/

const acceptDuel = async (query: CallbackQuery) => {
    const senderUserId = query.from.id
    const duelistUserId = query.message?.reply_to_message?.from?.id as number

    const duelistData = await getUserData(duelistUserId)
    if (!duelistData) return console.error({
        duelistData
    })

    if (duelistData.state.action !== 'duel_pending') return bot.answerCallbackQuery(query.id, { text: 'Время ожидания дуэли закончилось' })
    const { oponent_user_id: oponentUserId } = duelistData.state

    if (senderUserId !== oponentUserId) {
        bot.answerCallbackQuery(query.id)
        return bot.sendMessage(
            query.message?.chat.id as number,
            `${createMention(query.from.first_name, senderUserId)}, кнопка предназначается не тебе!`,
            {
                parse_mode: 'Markdown'
            }
        )
    }

    bot.answerCallbackQuery(query.id, {
        text: '*Дуэль якобы началась*',
        show_alert: true
    })

    bot.sendMessage(query.message?.chat.id as number, 'Дуэль началась блин')

    bot.answerCallbackQuery(query.id)
    duelEvent(duelistUserId, oponentUserId, query.message?.chat.id as number)
}

export default acceptDuel