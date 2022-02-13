import React from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"
import Form from "../../molecules/Form/Form"
import { ROUTES } from "../../../constants"
import "./Login.scss"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = authContext()

    if (!!auth.user) {
        return <Navigate to={ROUTES.Chat} state={{ from: location }} replace />
    }

    const login = (credentials: { user: string; password: string }) => {
        auth.signin(credentials.user, () => {
            navigate(ROUTES.Chat, { replace: true })
        })
    }

    return (
        <article className="Login">
            <h2>Login</h2>
            <Form action={login} />
        </article>
    )
}

export default Login
