import React from "react"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"
import "./Nav.scss"

const Nav: React.FC = () => {
    const auth = authContext()
    const navigate = useNavigate()

    const signOut = () => {
        auth.signout(() => navigate("/"))
    }

    const renderSignOut = () => {
        if (!!auth.user) {
            return (
                <li>
                    <button onClick={signOut}>Sign out</button>
                </li>
            )
        }
    }

    return (
        <nav className={"Nav"}>
            <ul>{renderSignOut()}</ul>
        </nav>
    )
}

export default Nav
