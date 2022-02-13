import React from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"
import Form from "../../molecules/Form/Form"
import { ROUTES } from "../../../constants"
import { Credentials } from "../../../API/API"
import "./Login.scss"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = authContext()

    if (!!auth.user) {
        return <Navigate to={ROUTES.Chat} state={{ from: location }} replace />
    }

    const login = (credentials: Credentials) => {
        auth.signin(credentials, () => {
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
