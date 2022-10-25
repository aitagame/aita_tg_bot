import { CallbackQuery } from "node-telegram-bot-api";
import redis from "@config/redis"
import bot from "@src/config/bot";
import finishWork from "@tools/finishWork";
import { userData } from "@src/types/redisUserData";

async function goToForest(query: CallbackQuery) {
    const user_id = query.from.id as number
    const chat_id = query.message?.chat.id as number
    const message_id = query.message?.message_id as number

    const response = await redis.get(user_id.toString())

    if (!response) {
        const start = Date.now()
        const end = start + (1000 * 60)

        const data: userData = {
            user_id: user_id,
            chat_id: chat_id,
            state: {
                action: 'forest',
                start: start,
                end: end,
            }
        }
        redis.set(user_id.toString(), JSON.stringify(data))

        setTimeout(() => {
            finishWork(user_id, 'You returned from the forest.')
        }, 1000 * 60);

        bot.answerCallbackQuery(query.id, {
            text: 'Successfull! You\'re going to forest'
        })

        bot.editMessageText('Your character is going to the forest. Good luck!', {
            chat_id: chat_id,
            message_id: message_id
        })

        return

    }

    const redisData = JSON.parse(response) as userData

    if (redisData.state.action !== 'idle') {        // If already in action
        bot.answerCallbackQuery(query.id, {
            text: 'Can\'t go to adventure now!'
        })
        return bot.sendMessage(chat_id, 'You already in adventure')
    }

    const start = Date.now()
    const end = start + (1000 * 60)

    const data: userData = {
        user_id: user_id,
        chat_id: chat_id,
        state: {
            action: 'forest',
            start: start,
            end: end,
        }
    }

    redis.set(user_id.toString(), JSON.stringify(data))

    setTimeout(() => {
        finishWork(user_id, 'You returned from the forest.')
    }, 1000 * 60);

    bot.answerCallbackQuery(query.id, {
        text: 'Successfull! You\'re going to forest'
    })

    bot.editMessageText('Your character is going to the forest. Good luck!', {
        chat_id: chat_id,
        message_id: message_id
    })

}

export default goToForest