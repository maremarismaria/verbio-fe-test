import React, { ReactText } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { authContext } from "../../../contexts/AuthContext"
import Form from "../../molecules/Form/Form"
import { ROUTES, TOAST_CLOSING_DELAY } from "../../../constants"
import { Credentials, LoginResponse } from "../../../API/API.def"
import "./Login.scss"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = authContext()
    let toastId: ReactText = ""

    if (auth.session.user.isAuthenticated) {
        return <Navigate to={ROUTES.Chat} state={{ from: location }} replace />
    }

    const onSuccess = (response: LoginResponse) => {
        if (!!response.error) {
            renderError(response.error)
        } else {
            navigate(ROUTES.Chat, { replace: true })
        }
    }

    const onError = (error: string) => {
        renderError(error)
    }

    const login = (credentials: Credentials) => {
        auth.login(credentials, onSuccess, onError)
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
            autoClose: TOAST_CLOSING_DELAY,
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
