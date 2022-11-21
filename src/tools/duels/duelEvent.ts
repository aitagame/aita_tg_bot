import Characters from "@sql/charactersDB"
import bot from "@src/config/bot"
import { CharacterType } from "@src/types/character"
import { Users } from "@src/types/sqltypes"
import getRandomInt from "@tools/getRandomInt"
import { UserData, UserDataController } from "@tools/redisController"

/*
    //TODO: Изменить состояние персонажей с idle в duel_battling
    //TODO: Провести сражение
    //TODO: Изменить состояние персонажей с duel_battling в idle
    //TODO: Выдать результаты сражения
    //TODO: Сбалансировать урон и защиту (Проработать систему урона в целом)
    * Сейчас урон совершенно случайный.
*/

async function duelEvent(duelistUserId: number, oponentUserId: number, chat_id: number | string) {
    const duelist = new UserDataController(duelistUserId)
    const oponent = new UserDataController(oponentUserId)
    const duelistUserData = await duelist.get()
    const oponentUserData = await oponent.get()

    const Users = new Characters()
    const duelistCharacter = await Users.readById(duelistUserId)
    const oponentCharacter = await Users.readById(oponentUserId)
    //
    if (!duelistCharacter || !oponentCharacter) return console.error('duelEvent characters: ', duelistCharacter, oponentCharacter)
    if (!duelistUserData || !oponentUserData) return console.error('duelEvent users data ', duelistUserData, oponentUserData)

    duelistUserData.state.action = oponentUserData.state.action = 'duel_battling'

    await duelist.update(duelistUserData)
    await oponent.update(oponentUserData)

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
            duelist.update(duelistUserData)
            oponent.update(oponentUserData)
            bot.sendMessage(chat_id, `${results.winner} win!`)
        }
    }, 3000)

}

type CharsType = CharacterType | Users

function simulateDuelEvent(duelist: CharsType, oponent: CharsType) {
    const roundsMessages: string[] = []
    let duelist_hp = 100
    let oponent_hp = 100

    while (duelist_hp > 0 && oponent_hp > 0) {
        const duelistDamage = calculateFinalDamage(duelist, oponent)
        const oponentDamage = calculateFinalDamage(oponent, duelist)

        duelist_hp -= oponentDamage.damage
        oponent_hp -= duelistDamage.damage

        const currentHPLog = `${duelist.name} ${duelist_hp}❤️ | ${oponent.name} ${oponent_hp}❤️`
        const criticalLog = (name: string, extraDamage: number) => { return `⚡️ ${name} deal critical damage! (+${extraDamage})` }

        const duelistCritLog = duelistDamage.isCritical ? criticalLog(duelist.name, duelistDamage.critDamage) : undefined
        const oponentCritLog = oponentDamage.isCritical ? criticalLog(oponent.name, oponentDamage.critDamage) : undefined
        const finalMessage = [currentHPLog, duelistCritLog, oponentCritLog].filter(item => item).join('\n')
        roundsMessages.push(finalMessage)
    }
    const winner = duelist_hp > oponent_hp ? duelist.name : oponent.name
    return { roundsMessages, winner }
}

function getPecrent(number: number, percent: number) {
    return number * (percent / 100)
}

function blockedDamage(attack: number, armor: number) {
    while (armor--) {
        attack -= Math.ceil(getPecrent(attack, 10))
    }
    return attack + 1
}

function isCriricalDamage(character: CharsType) {
    return getRandomInt(0, 100) < character.crit_chance
}

function calculateFinalDamage(character: CharsType, oponent: CharsType) {
    let damage = blockedDamage(character.attack, oponent.armor)
    const isCritical = isCriricalDamage(character)
    if (isCritical) damage *= character.crit_damage
    const critDamage = damage / character.crit_damage

    return { damage, isCritical, critDamage }
}

export { duelEvent }