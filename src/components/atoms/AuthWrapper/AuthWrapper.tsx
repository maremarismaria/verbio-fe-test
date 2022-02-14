import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"
import { ROUTES } from "../../../constants"

interface Props {
    children: JSX.Element
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
    const auth = authContext()
    const location = useLocation()

    if (!auth.session.user.isAuthenticated) {
        return <Navigate to={ROUTES.Login} state={{ from: location }} replace />
    }

    return children
}

export default AuthWrapper
