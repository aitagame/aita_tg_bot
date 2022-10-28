import './paths';
import db from './config/db'
import bot from './config/bot'
import redis from './config/redis'
import textController from '@handlers/textController';
import callbackQueryController from '@handlers/cbQueryController';
import { userData } from 'types/redisUserData'
import finishWork from '@tools/finishWork';
import { InlineQueryResult } from 'node-telegram-bot-api';
import Characters from '@sql/charactersDB';
import { characterInfoTemplate, CharInfoType } from '@handlers/commands/characterInfo/getinfo.template';

async function restoreTasks() {
    const keysList = await redis.keys('*')
    if (!keysList) {
        return console.log('Empty set.')
    }
    keysList.forEach(async (item) => {
        const response = await redis.get(item) as string
        const userData = JSON.parse(response) as userData

        if (userData.state.action === 'idle' || userData.state.start === null || userData.state.end === null) {
            return
        }

        const elapsedTime = userData.state.end - Date.now()

        setTimeout(() => {
            finishWork(userData.user_id)
        }, elapsedTime)
    })
}

async function startServer() {
    try {
        db.connect(() => {
            console.log('Connected to DB')
        })
        await bot.startPolling().then(_ => console.log('Bot started polling successfully'))
        await redis.connect().then(() => {
            console.log('Redis connected')
        })
    }
    catch (err) {
        throw err
    }
}

startServer().then(() => {
    restoreTasks().then(() => {
        bot.on('text', textController)
        bot.on('callback_query', callbackQueryController)
        bot.on('inline_query', async (query) => {
            const controller = new Characters()
            const userData = await controller.readById(query.from.id)
            console.log(query)

            if (!userData) {
                return bot.answerInlineQuery(query.id, [{
                    type: 'article', id: '1', title: 'I have no character', input_message_content: {
                        message_text: 'I have not character :C'
                    }
                }], {
                    cache_time: 1,
                    switch_pm_text: 'Create one',
                    switch_pm_parameter: 'create_character'
                })
            }

            const charInfo: CharInfoType = {
                name: userData.name,
                level: userData.level,
                experience: userData.experience,
                maxLevelExperience: 1250,
                element_id: userData.element,
                armor: userData.armor,
                attack: userData.attack,
                crit_chance: userData.crit_chance,
                crit_multiplicator: userData.crit_damage,
                evade_chance: userData.evade_chance,
                loses: 0,
                wins: 0,
                rating: userData.rating
            }

            const replyText = characterInfoTemplate(charInfo)

            const results: InlineQueryResult[] = [
                {
                    type: 'article', id: '1', title: 'Share my profile', input_message_content: {
                        message_text: replyText
                    }
                }
            ]
            bot.answerInlineQuery(query.id, results, {
                cache_time: 1
            })
        })
    })
})

