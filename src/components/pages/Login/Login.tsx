import React from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"
import Form from "../../molecules/Form/Form"
import "./Login.scss"

interface LocationState {
    from?: {
        pathname: string
    }
}

const Login: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = authContext()
    // const from = (location.state as LocationState)?.from?.pathname || "/"

    if (!!auth.user) {
        return <Navigate to="/chat" state={{ from: location }} replace />
    }

    const login = (credentials: { user: string; password: string }) => {
        auth.signin(credentials.user, () => {
            navigate("/chat", { replace: true })
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
