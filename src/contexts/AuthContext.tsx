import React from "react"
import useSession, { emptySession, Session } from "../hooks/useSession"
import { DEFAULT_ERROR_MESSAGE } from "../constants"
import * as API from "../API/API"

interface AuthContextType {
    session: Session
    login: (
        credentials: API.Credentials,
        onSuccess: Function,
        onError: Function
    ) => void
    logout: (callback: Function) => void
    getWelcomeMessage: () => Promise<API.APIResponse>
    sendMessage: (text: string) => Promise<API.APIResponse>
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

    const login = async (
        credentials: API.Credentials,
        onSuccess: Function,
        onError: Function
    ) => {
        try {
            const response = await API.login(credentials)

            if (!response.data) {
                onSuccess(response)
                return
            }

            setSession(
                {
                    user: {
                        name: credentials.user,
                        isAuthenticated: true,
                    },
                    token: response.data.session_id,
                },
                onSuccess(response)
            )
        } catch (e) {
            onError(DEFAULT_ERROR_MESSAGE)
        }
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
