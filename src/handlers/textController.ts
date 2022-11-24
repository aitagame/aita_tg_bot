import { Message, Metadata } from "node-telegram-bot-api";
import commands from "./handlers";

async function textController(msg: Message, meta: Metadata) {
    const text = msg.text?.toString().toLowerCase()

    if (msg.chat.type === 'private') {
        switch (text) {
            case ('/info'): {
                return commands.commands.getInfo(msg)
            }
            case ('/start'): {
                return commands.commands.registerUser(msg)
            }
            case ('/register'): {
                return commands.commands.registerUser(msg)
            }
            case ('/items'): {
                return commands.commands.getResources(msg)
            }
        }
    }

    if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
        switch (text) {
            case ('вызвать на дуэль'): {
                return commands.commands.makeDuelText(msg)
            }
        }
    }

}

export default textController