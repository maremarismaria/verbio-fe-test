import React from "react"
import { Link, useLocation } from "react-router-dom"
import { ROUTES } from "../../../constants"
import "./NotFound.scss"

interface LocationState {
    from?: {
        pathname: string
    }
}

const NotFound: React.FC = () => {
    const location = useLocation()
    const from =
        (location.state as LocationState)?.from?.pathname || ROUTES.Login

    return (
        <article className="NotFound">
            <h2>404</h2>
            <p>Page not found :(</p>
            <p>The requested page could not be found.</p>
            <Link to={ROUTES.Login} state={{ from }} replace>
                Go back
            </Link>
        </article>
    )
}

export default NotFound
