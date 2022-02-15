import React from "react"
import "./ChatHeader.scss"

export interface Props {
    receiver: string
    typing: boolean
}

const ChatHeader: React.FC<Props> = ({ receiver, typing }) => {
    const status = typing ? "Typing..." : "Online"

    return (
        <div className={"ChatHeader"}>
            <p className={"receiver"}>{receiver}</p>
            <p className={"status"}>{status}</p>
        </div>
    )
}

export default ChatHeader
