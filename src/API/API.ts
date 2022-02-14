import { API_URL } from "../constants"

const ENDPOINTS = {
    login: {
        uri: `${API_URL}/login`,
        method: "POST",
    },
    getWelcomeMessage: {
        uri: `${API_URL}/getWelcomeMessage`,
        method: "GET",
    },
    sendMessage: {
        uri: `${API_URL}/sendMessage`,
        method: "POST",
    },
}

enum HTTPStatuses {
    UNAUTHORIZED = 401,
}

export type BotMessageType = "text" | "image"

export type BotMessage = {
    text?: string
    url?: string
    type: BotMessageType
}

export type APIResponse = {
    data: BotMessage[]
    error: string
}

/**
 * LOGIN
 */

export type Credentials = {
    user: string
    password: string
}

export type LoginResponse = {
    data: {
        session_id: string
    }
    error: string
}

type LoginRequest = (credentials: Credentials) => Promise<LoginResponse>

export const login: LoginRequest = async (credentials) => {
    const response = await fetch(ENDPOINTS.login.uri, {
        method: ENDPOINTS.login.method,
        body: JSON.stringify({ ...credentials }),
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (HTTPStatuses.UNAUTHORIZED === response.status) {
        return {
            data: undefined,
            error: "The credentials you entered are incorrect. Please, check them and try again.",
        }
    }

    const data = await response.json()
    return {
        data,
        error: "",
    }
}

/**
 * GET WELCOME MESSAGE
 */

type GetWelcomeMessageRequest = (token: string) => Promise<APIResponse>

export const getWelcomeMessage: GetWelcomeMessageRequest = async (token) => {
    const response = await fetch(ENDPOINTS.getWelcomeMessage.uri, {
        method: ENDPOINTS.getWelcomeMessage.method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    if (HTTPStatuses.UNAUTHORIZED === response.status) {
        return {
            data: undefined,
            error: "Sorry, it looks like your session just expired. Please, sign in again.",
        }
    }

    const data = await response.json()
    return {
        data: data.response,
        error: "",
    }
}

/**
 * SEND MESSAGE
 */

type SendMessageRequest = (token: string, text: string) => Promise<APIResponse>

export const sendMessage: SendMessageRequest = async (token, text) => {
    const response = await fetch(ENDPOINTS.sendMessage.uri, {
        method: ENDPOINTS.sendMessage.method,
        body: JSON.stringify({ text }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    if (HTTPStatuses.UNAUTHORIZED === response.status) {
        return {
            data: undefined,
            error: "Sorry, it looks like your session just expired. Please, sign in again.",
        }
    }

    const data = await response.json()
    return {
        data: data.response,
        error: "",
    }
}
