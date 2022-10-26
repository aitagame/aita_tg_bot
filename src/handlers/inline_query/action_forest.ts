import { CallbackQuery } from "node-telegram-bot-api";
import redis from "@config/redis"
import bot from "@src/config/bot";
import finishWork from "@tools/finishWork";
import { userData } from "@src/types/redisUserData";
import actionsData from '@data/actions.json'


async function goToForest(query: CallbackQuery) {
    const user_id = query.from.id as number
    const chat_id = query.message?.chat.id as number
    const message_id = query.message?.message_id as number

    const response = await redis.get(user_id.toString())

    if (!response) {        // If no data about user state
        createTask({
            chat_id: chat_id,
            time: actionsData.forest.time,
            user_id: user_id,
            action: 'forest'
        })
        return sendAnswer({ chat_id, message_id, query })
    }

    const redisData = JSON.parse(response) as userData  // Parse JSON from Redis

    if (redisData.state.action !== 'idle') {        // If already in action
        bot.answerCallbackQuery(query.id)
        return bot.sendMessage(chat_id, 'You already in adventure')
    }

    createTask({        // Create task
        chat_id: chat_id,
        time: actionsData.forest.time,
        user_id: user_id,
        action: 'forest'
    })

    sendAnswer({ chat_id, message_id, query })
}


// ========>


type TaskOptions = {
    time: number
    user_id: number,
    chat_id: number,
    action: userData['state']['action']
}

function createTask(options: TaskOptions) {
    const { action, chat_id, time, user_id } = options
    const start = Date.now()
    const end = start + time

    const data: userData = {
        user_id: user_id,
        chat_id: chat_id,
        state: {
            action: action,
            start: start,
            end: end,
        }
    }

    redis.set(user_id.toString(), JSON.stringify(data))

    setTimeout(() => {
        finishWork(user_id)
    }, time);
}

// ========>

type AnswerOptions = {
    query: CallbackQuery,
    chat_id: number,
    message_id: number
}

function sendAnswer(options: AnswerOptions) {
    const { chat_id, message_id, query } = options
    bot.answerCallbackQuery(query.id)

    bot.editMessageText(actionsData.forest.go_message, {
        chat_id: chat_id,
        message_id: message_id
    })
}

export default goToForest