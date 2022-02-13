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

/**
 * LOGIN
 */

export type Credentials = {
    user: string
    password: string
}

type LoginResponse = {
    session_id: string
}

type LoginRequest = (credentials: Credentials) => Promise<LoginResponse>

export const login: LoginRequest = async (credentials) => {
    try {
        const response = await fetch(ENDPOINTS.login.uri, {
            method: ENDPOINTS.login.method,
            body: JSON.stringify({ ...credentials }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        return await response.json()
    } catch (e) {
        console.error(e.toString())
    }
}

/**
 * GET WELCOME MESSAGE
 */

export type BotMessage = {
    text?: string
    url?: string
    type: string
}

type GetWelcomeMessageRequest = (token: string) => Promise<BotMessage[]>

export const getWelcomeMessage: GetWelcomeMessageRequest = async (token) => {
    try {
        const response = await fetch(ENDPOINTS.getWelcomeMessage.uri, {
            method: ENDPOINTS.getWelcomeMessage.method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json()
        return data.response
    } catch (e) {
        console.error(e.toString())
    }
}

/**
 * SEND MESSAGE
 */

type SendMessageRequest = (token: string, text: string) => Promise<BotMessage[]>

export const sendMessage: SendMessageRequest = async (token, text) => {
    try {
        const response = await fetch(ENDPOINTS.sendMessage.uri, {
            method: ENDPOINTS.sendMessage.method,
            body: JSON.stringify({ text }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json()
        return data.response
    } catch (e) {
        console.error(e.toString())
    }
}
