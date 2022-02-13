import React from "react"
import Input from "../../atoms/Input/Input"
import "./Form.scss"

/**
 * Notes about the login component:
 *
 * I would use CryptoJS (SHA256) for sending the password encrypted, but the backend expects "admin" directly
 * I am not using required attribute because I wanna make fancy error situations :D
 */

interface Props {
    action: (credentials: { user: string; password: string }) => unknown
}

const Form: React.FC<Props> = ({ action }) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const user = formData.get("user") as string
        const password = formData.get("password") as string
        action({ user, password })
    }

    return (
        <form className={"Form"} onSubmit={onSubmit}>
            <label htmlFor="user">Username</label>
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
