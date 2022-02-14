import React, { ReactText } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { authContext } from "../../../contexts/AuthContext"
import Form from "../../molecules/Form/Form"
import { ROUTES } from "../../../constants"
import { Credentials, LoginResponse } from "../../../API/API"
import "./Login.scss"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = authContext()
    let toastId: ReactText = ""

    if (auth.session.user.isAuthenticated) {
        return <Navigate to={ROUTES.Chat} state={{ from: location }} replace />
    }

    const login = (credentials: Credentials) => {
        auth.login(credentials, (response: LoginResponse) => {
            if (!!response.error) {
                renderError(response.error)
            } else {
                navigate(ROUTES.Chat, { replace: true })
            }
        })
    }

    const renderError = (error: string) => {
        if (!!toastId) {
            return
        }

        const toastOptions = {
            onClose: () => {
                toast.dismiss(toastId)
                toastId = ""
            },
            autoClose: 6000,
            closeOnClick: true,
            type: toast.TYPE.ERROR,
            position: toast.POSITION.TOP_RIGHT,
        }

        toastId = toast(error, toastOptions)
    }

    return (
        <article className={"Login"}>
            <Form action={login} />
        </article>
    )
}

export default Login
