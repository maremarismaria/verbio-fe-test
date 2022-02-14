export type Credentials = {
    user: string
    password: string
}

interface APIResponse<T> {
    data: T
    error: string
}

export interface LoginResponse
    extends APIResponse<{
        session_id: string
    }> {}

export type BotMessageType = "text" | "image"

export type BotMessage = {
    text?: string
    url?: string
    type: BotMessageType
}

export interface MessageResponse extends APIResponse<BotMessage[]> {}
