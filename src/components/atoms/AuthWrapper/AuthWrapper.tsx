import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"

interface Props {
    children: JSX.Element
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
    const auth = authContext()
    const location = useLocation()

    if (!auth.user) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children
}

export default AuthWrapper
