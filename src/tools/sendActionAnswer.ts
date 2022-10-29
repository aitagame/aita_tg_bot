import actionsData from '@data/actions.json'
import bot from '@src/config/bot'

type AnswerOptions = {
    query_id: string,
    chat_id: number,
    message_id: number,
    action: keyof typeof actionsData
}

function sendAnswer(options: AnswerOptions) {
    const { chat_id, message_id, action, query_id } = options
    bot.answerCallbackQuery(query_id)

    bot.editMessageText(actionsData[action].go_message, {
        chat_id: chat_id,
        message_id: message_id
    })
}

export { sendAnswer }