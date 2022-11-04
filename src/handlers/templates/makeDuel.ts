import createMention from "@tools/createMention"

interface UserInfo {
    user_id: number,
    name: string
}

export interface DuelTemplateType {
    duelist: UserInfo
    oponent: UserInfo
}

export function makeDuelTemplate(options: DuelTemplateType) {
    const {duelist, oponent} = options
    return `Hey, ${createMention(oponent.name, oponent.user_id)}, it looks like ${createMention(duelist.name, duelist.user_id)} wants to fight you!
Your answer is...`
}