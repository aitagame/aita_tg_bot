import Characters from "@sql/charactersDB"
import bot from "@src/config/bot"
import redis from "@src/config/redis"
import { CharacterType } from "@src/types/character"
import { Users } from "@src/types/sqltypes"
import getRandomInt from "@tools/getRandomInt"
import { getUserData } from "@tools/redis.getUserData"

/*
    //TODO: Изменить состояние персонажей с idle в duel_battling
    //TODO: Провести сражение
    //TODO: Изменить состояние персонажей с duel_battling в idle
    //TODO: Выдать результаты сражения
    TODO: Сбалансировать урон и защиту (Проработать систему урона в целом)
    * Сейчас урон совершенно случайный.
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

    duelistUserData.state.action = oponentUserData.state.action = 'duel_battling'

    await redis.set(duelistUserId.toString(), JSON.stringify(duelistUserData))
    await redis.set(oponentUserId.toString(), JSON.stringify(oponentUserData))

    const results = simulateDuelEvent(duelistCharacter, oponentCharacter)
    let createdMessage = await bot.sendMessage(chat_id, results.roundsMessages[0])

    let i = 1
    const interval = setInterval(async () => {
        const { roundsMessages } = results
        bot.editMessageText(roundsMessages[i], {
            chat_id: createdMessage.chat.id,
            message_id: createdMessage.message_id
        })
        i++
        if (typeof roundsMessages[i] === 'undefined') {
            clearInterval(interval)
            duelistUserData.state.action = 'idle'
            oponentUserData.state.action = 'idle'
            redis.set(duelistUserId.toString(), JSON.stringify(duelistUserData))
            redis.set(oponentUserId.toString(), JSON.stringify(oponentUserData))
            bot.sendMessage(chat_id, `${results.winner} win!`)
        }
    }, 1000)

}

type CharsType = CharacterType | Users

function simulateDuelEvent(duelist: CharsType, oponent: CharsType) {
    const roundsMessages: string[] = []
    let duelist_hp = 100
    let oponent_hp = 100

    while (duelist_hp > 0 && oponent_hp > 0) {
        const duelistDamage = blockedDamage(duelist.attack, oponent.armor)
        const oponentDamage = blockedDamage(oponent.attack, duelist.armor)

        duelist_hp -= oponentDamage
        oponent_hp -= duelistDamage

        const message = `${duelist.name} ${duelist_hp}❤️ | ${oponent.name} ${oponent_hp}❤️`
        roundsMessages.push(message)
    }
    const winner = duelist_hp > oponent_hp ? duelist.name : oponent.name
    return { roundsMessages, winner }
}

function getPecrent(number: number, percent: number) {
    return number * (percent / 100)
}

function blockedDamage(attack: number, armor: number) {
    while(armor--){
        attack -= Math.ceil(getPecrent(attack, 10))
    }
    return attack + 1
}

export { duelEvent }