import Characters from "@sql/charactersDB";
import { Message } from "node-telegram-bot-api";
import commands from "./handlers";

async function textController(msg: Message) {
    const { text } = msg

    const charController = new Characters()

    const user = await charController.readById(msg.from?.id as number)

    if (!user) {
        return commands.commands.registerUser(msg)
    }

    switch (text) {
        case '/start':
        case '/info': {
            return commands.commands.getInfo(msg)
        }
        case ('/items'): {
            return commands.commands.getResources(msg)
        }
    }
}

export default textController