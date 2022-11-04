function createMention(name: string, user_id: number) {
    return `\[${name}\](tg://user?id=${user_id})`
}

export default createMention