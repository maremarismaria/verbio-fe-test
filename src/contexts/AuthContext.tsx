import React from "react"
import useSession, { emptySession, Session } from "../hooks/useSession"
import * as API from "../API/API"
import { APIResponse } from "../API/API"

interface AuthContextType {
    session: Session
    login: (credentials: API.Credentials, callback: Function) => void
    logout: (callback: Function) => void
    getWelcomeMessage: () => Promise<APIResponse>
    sendMessage: (text: string) => Promise<APIResponse>
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
    const { session, setSession } = useSession()

    const login = async (credentials: API.Credentials, callback: Function) => {
        const response = await API.login(credentials)

        setSession(
            {
                user: {
                    name: credentials.user,
                    isAuthenticated: true,
                },
                token: response.session_id,
            },
            callback
        )
    }

    const logout = async (callback: Function) => {
        setSession(emptySession, callback)
    }

    const getWelcomeMessage = async () => {
        return await API.getWelcomeMessage(session.token)
    }

    const sendMessage = async (text: string) => {
        return await API.sendMessage(session.token, text)
    }

    const value = {
        session,
        login,
        logout,
        getWelcomeMessage,
        sendMessage,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
