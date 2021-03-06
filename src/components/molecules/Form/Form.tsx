import React, { ReactText } from "react"
import { toast } from "react-toastify"
import Input from "../../atoms/Input/Input"
import { TOAST_CLOSING_DELAY } from "../../../constants"
import "./Form.scss"

/**
 * Notes about the login component:
 *
 * I would use CryptoJS (SHA256) for sending the password encrypted, but the backend expects "admin" directly
 * I am not using required attribute because I wanna make fancy error situations :D
 */

interface Props {
    action: (credentials: { user: string; password: string }) => void
}

const Form: React.FC<Props> = ({ action }) => {
    let toastId: ReactText = ""

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const user = formData.get("user") as string
        const password = formData.get("password") as string

        const missingUser = !user || !user.trim().length
        const missingPassword = !password || !password.trim().length

        if (missingUser || missingPassword) {
            return renderWarning("Please, enter a correct user and password.")
        }

        // TODO Close opened warning toast if the action is performed
        action({ user, password })
    }

    const renderWarning = (warning: string) => {
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
            type: toast.TYPE.WARNING,
            position: toast.POSITION.TOP_RIGHT,
        }

        toastId = toast(warning, toastOptions)
    }

    return (
        <form className={"Form"} onSubmit={onSubmit}>
            <h2>Welcome back!</h2>
            <label htmlFor="user">User</label>
            <Input
                id={"user"}
                name={"user"}
                type={"text"}
                placeholder={"Username"}
                autoComplete={"username"}
                aria-required
                // required
            />

            <label htmlFor="password">Password</label>
            <Input
                id={"password"}
                name={"password"}
                type={"password"}
                placeholder={"Password"}
                autoComplete={"current-password"}
                aria-required
                // required
            />

            <Input type={"submit"} value={"Login"} />
        </form>
    )
}

export default Form
