import { Message } from "node-telegram-bot-api";
import commands from "./commands";

function textController(msg: Message) {
    const { text } = msg

    switch (text) {
        case ('/start'): {
            return commands.registerUser(msg)
        }
        case ('/info'): {
            return commands.getInfo(msg)
        }
        case ('/resources'): {
            return commands.getResources(msg)
        }
    }
}

export default textController