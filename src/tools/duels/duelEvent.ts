import Characters from "@sql/charactersDB"
import bot from "@src/config/bot"
import redis from "@src/config/redis"
import createMention from "@tools/createMention"
import getRandomInt from "@tools/getRandomInt"
import { getUserData } from "@tools/redis.getUserData"

/*
    //TODO: Изменить состояние персонажей с idle в duel_battling
    TODO: Провести сражение
    //TODO: Изменить состояние персонажей с duel_battling в idle
    //TODO: Выдать результаты сражения
*/

async function duelEvent(duelistUserId: number, oponentUserId: number, chat_id: number | string) {
    const duelistUserData = await getUserData(duelistUserId)
    const oponentUserData = await getUserData(oponentUserId)

    const Users = new Characters()
    const duelistCharacter = await Users.readById(duelistUserId)
    const oponentCharacter = await Users.readById(oponentUserId)
    //
    if (!duelistCharacter || !oponentCharacter) return console.error('duelEvent characters: ', duelistCharacter, oponentCharacter)
    if (!duelistUserData || !oponentUserData) return console.error('duelEvent users data ', duelistUserData, oponentUserData)

    duelistUserData.state.action = 'duel_battling'
    oponentUserData.state.action = 'duel_battling'
    await redis.set(duelistUserId.toString(), JSON.stringify(duelistUserData))
    await redis.set(oponentUserId.toString(), JSON.stringify(oponentUserData))

    setTimeout(async () => {
        duelistUserData.state.action = 'idle'
        oponentUserData.state.action = 'idle'
        await redis.set(duelistUserId.toString(), JSON.stringify(duelistUserData))
        await redis.set(oponentUserId.toString(), JSON.stringify(oponentUserData))
        const winner = getRandomInt(0, 1) === 0
        const name = winner ? duelistCharacter.name : oponentCharacter.name
        const user_id = winner ? duelistCharacter.user_id : oponentCharacter.user_id
        bot.sendMessage(chat_id, `${createMention(name, user_id)} win!`, {
            parse_mode: 'Markdown'
        })
    }, 7000)

}

export { duelEvent }