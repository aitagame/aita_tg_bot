import { InlineQuery } from "node-telegram-bot-api";
import handlers from "./handlers";

function inlineQueryController(query: InlineQuery) {

    const { inlineDuel } = handlers.inlineQuerys

    return inlineDuel(query)


}

export default inlineQueryController