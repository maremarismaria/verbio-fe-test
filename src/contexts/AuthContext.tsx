import React from "react"
import useToken from "../hooks/useToken"

interface AuthContextType {
    user: any
    signin: (user: string, callback: VoidFunction) => void
    signout: (callback: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function authContext() {
    return React.useContext(AuthContext)
}

const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true
        setTimeout(callback, 100) // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false
        setTimeout(callback, 100)
    },
}

export function AuthContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const { token, setToken } = useToken()
    const [user, setUser] = React.useState<string | null>(token)

    const signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser)
            setToken("le-token")
            callback()
        })
    }

    const signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null)
            setToken(null)
            callback()
        })
    }

    const value = { user, signin, signout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
