import React from "react"
import useToken from "../hooks/useToken"
import * as API from "../API/API"

interface AuthContextType {
    user: any
    signin: (credentials: API.Credentials, callback: Function) => void
    signout: (callback: Function) => void
    getWelcomeMessage: () => Promise<API.BotMessage[] | undefined>
    sendMessage: (text: string) => Promise<API.BotMessage[] | undefined>
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function authContext() {
    return React.useContext(AuthContext)
}

export function AuthContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const { token, setToken } = useToken()
    const [user, setUser] = React.useState<string | null>()

    const signin = async (credentials: API.Credentials, callback: Function) => {
        try {
            const response = await API.login(credentials)
            setUser(credentials.user)
            setToken(response.session_id)
            callback()
        } catch (e) {
            console.error(e.toString())
        }
    }

    const signout = async (callback: Function) => {
        setUser(null)
        setToken(null)
        callback()
    }

    const getWelcomeMessage = async () => {
        try {
            return await API.getWelcomeMessage(token || "")
        } catch (e) {
            console.error(e.toString())
        }
    }

    const sendMessage = async (text: string) => {
        try {
            return await API.sendMessage(token || "", text)
        } catch (e) {
            console.error(e.toString())
        }
    }

    const value = { user, signin, signout, getWelcomeMessage, sendMessage }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
