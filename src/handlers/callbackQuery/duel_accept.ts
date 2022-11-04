import { CallbackQuery } from "node-telegram-bot-api"
import { resourceTemplate } from "@handlers/templates/items"
import bot from "@src/config/bot"
import ItemsDBController from "@sql/itemsDB"

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
    const messageReply = query.message?.reply_to_message


    
    if(!messageReply) { // * Check is not private duel
        
    }




    bot.answerCallbackQuery(query.id)
}

export default acceptDuel