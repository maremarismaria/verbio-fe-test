import { useState } from "react"
import { STORAGE_KEY } from "../constants"

type Token = string | null

interface UseToken {
    token: Token
    setToken: (token: Token) => void
}

const getToken: () => Token = () => {
    const token = sessionStorage.getItem(STORAGE_KEY)
    return !!token ? JSON.parse(token) : null
}

const saveToken: (token: Token) => void = (token) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(token))
}

const removeToken: () => void = () => {
    sessionStorage.removeItem(STORAGE_KEY)
}

const useToken: () => UseToken = () => {
    const [token, setToken] = useState<Token>(getToken())

    return {
        token,
        setToken: (token) => {
            !!token ? saveToken(token) : removeToken()
            setToken(token)
        },
    }
}

export default useToken
