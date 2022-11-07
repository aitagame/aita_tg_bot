import { CallbackQuery, Message } from "node-telegram-bot-api"
import { resourceTemplate } from "@handlers/templates/items"
import bot from "@src/config/bot"
import ItemsDBController from "@sql/itemsDB"
import redis from "@src/config/redis"
import { UserDataType } from "@src/types/redisUserData"
import createMention from "@tools/createMention"

/* 
    TODO: 1. Обработать случай принятия дуэли и отмены дуэли
    TODO: 2. Обработать случай приватной или публичной дуэли (основываясь на наличии реплая)
    *TODO: 3. Игнорить тех, кто  нажал на кнопку не предназначенную ему
    TODO: 4. Отработать кейс, если дуэль была отправлена самому себе
    // ? Нужен ли шаблонизатор здесь?
    ! Будет локализация.
    
    * Вызываемый не может быть ботом.
    * У вызываемого должен быть аккаунт в боте.
*/

const acceptDuel = async (query: CallbackQuery) => {
    const senderUserId = query.from.id
    const messageReply = query.message?.reply_to_message as Message

    const duelistRedis = await redis.get(query.message?.reply_to_message?.from?.id.toString() as string)
    if (!duelistRedis) return
    const duelistData = JSON.parse(duelistRedis) as UserDataType
    if (!duelistData) return
    if (duelistData.state.action !== 'duel') return
    const { oponent_user_id } = duelistData.state

    if (senderUserId !== oponent_user_id) {
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


    bot.answerCallbackQuery(query.id)
}

export default acceptDuel