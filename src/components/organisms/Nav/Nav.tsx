import React from "react"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"
import { ROUTES } from "../../../constants"
import "./Nav.scss"

const Nav: React.FC = () => {
    const auth = authContext()
    const navigate = useNavigate()

    const signOut = () => {
        auth.signout(() => navigate(ROUTES.Login))
    }

    const renderNav = () => {
        return (
            <nav className={"Nav"}>
                <ul>
                    <li>
                        <button onClick={signOut}>Sign out</button>
                    </li>
                </ul>
            </nav>
        )
    }

    return !!auth.user ? renderNav() : null
}

export default Nav
