import Characters from "@sql/charactersDB"
import { Character } from "@src/classes/character"
import bot from "@src/config/bot"
import { UserDataController } from "@tools/redisController"
import { simulateDuel } from "./simulateDuel"

/**
 * Function that handle duel process
 * @param duelistUserId User's user_id who will fight
 * @param oponentUserId User's user_id who will fight
 * @param chat_id Telegram chat id where duel is going
 * @returns 
 */

async function duelEvent(duelistUserId: number, oponentUserId: number, chat_id: number | string) {
    //  get users's data

    const duelist = new UserDataController(duelistUserId)
    const oponent = new UserDataController(oponentUserId)
    const duelistUserData = await duelist.get()
    const oponentUserData = await oponent.get()

    const Users = new Characters()
    const duelistData = await Users.readById(duelistUserId)
    const oponentData = await Users.readById(oponentUserId)

    //

    // Check is users characters exists
    if (!duelistData || !oponentData) return console.error('duelEvent characters: ', duelistData, oponentData)
    if (!duelistUserData || !oponentUserData) return console.error('duelEvent users data ', duelistUserData, oponentUserData)
    //

    const duelistCharacter = new Character(duelistData)
    const oponentCharacter = new Character(oponentData)

    duelistUserData.state.action = oponentUserData.state.action = 'duel_battling' //modifing states of users

    await duelist.update(duelistUserData)
    await oponent.update(oponentUserData)   // update users state to 'duel_battling'

    const results = simulateDuel(duelistCharacter, oponentCharacter) // simulate duel 🔥

    /*
        * Here i was send message from index 0 of results of duel
        * for get possibility to edit this message.
        * variable createdMessage contains info about sended message.
    */// || || || || ||
    //   \/ \/ \/ \/ \/
    let createdMessage = await bot.sendMessage(chat_id, results.roundsMessages[0])
    //  /\ /\ /\ /\ /\
    let i = 1   // 1 becouse index 0 was used before
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


export { duelEvent }