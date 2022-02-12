import React from "react"
import "./NotFound.scss"

const NotFound: React.FC = () => {
    return (
        <article className="NotFound">
            <h2>404</h2>
            <p>Page not found :(</p>
            <p>The requested page could not be found.</p>
        </article>
    )
}

export default NotFound
