import { Message } from "node-telegram-bot-api";
import getInfo from "./commands/getInfo";
import getResources from "./commands/getResources";
import registerUser from "./commands/registerUser";

function textController(msg: Message) {
    const { text } = msg

    switch (text) {
        case ('/start'): {
            return registerUser(msg)
        }
        case ('/info'): {
            return getInfo(msg)
        }
        case ('/resources'): {
            return getResources(msg)
        }
    }
}

export default textController