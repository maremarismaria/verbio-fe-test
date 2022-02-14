import { useState } from "react"
import { STORAGE_KEY } from "../constants"

type Token = string

type User = {
    name: string
    isAuthenticated: boolean
}

export interface Session {
    token: Token
    user: User
}

interface UseSession {
    session: Session
    setSession: (session: Session, callback?: Function) => void
}

export const emptySession: Session = {
    user: {
        name: "",
        isAuthenticated: false,
    },
    token: "",
}

const getSession: () => Session = () => {
    const session = sessionStorage.getItem(STORAGE_KEY)
    return !!session ? JSON.parse(session) : emptySession
}

const saveSession: (session: Session) => void = (session) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

const flushSession: () => void = () => {
    sessionStorage.removeItem(STORAGE_KEY)
}

const useSession: () => UseSession = () => {
    const [session, setSession] = useState<Session>(getSession())

    return {
        session,
        setSession: (session, callback) => {
            !!session ? saveSession(session) : flushSession()
            setSession(session)

            if (callback) {
                callback()
            }
        },
    }
}

export default useSession
