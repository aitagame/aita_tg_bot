import Characters from "@sql/charactersDB";
import { Message, Metadata } from "node-telegram-bot-api";
import commands from "./handlers";

async function textController(msg: Message, meta: Metadata) {
    const text = msg.text?.toString().toLowerCase()

    const charController = new Characters()

    const user = await charController.readById(msg.from?.id as number)

    const matches = {
        getUserInfo: /^(\/start|\/info)/
    }

    if (!user) {
        return commands.commands.registerUser(msg)
    }

    switch (text) {
        case text?.match(matches.getUserInfo): {
            return commands.commands.getInfo(msg)
        }
        case ('/items'): {
            return commands.commands.getResources(msg)
        }
        case ('вызвать на дуэль'): {
            return commands.commands.makeDuelText(msg)
        }
    }
}

export default textController