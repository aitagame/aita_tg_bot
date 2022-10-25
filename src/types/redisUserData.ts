export type userData = {
    user_id: number
    chat_id: number
    state: {
        action: 'idle' | 'forest' | 'caves'
        start: number | null
        end: number | null
    }
}