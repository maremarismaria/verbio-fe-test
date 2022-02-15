import React from "react"
import { ChatMessage } from "../../pages/Chat/Chat"
import { getHour } from "../../../utils/Date"
import "./MessageBalloon.scss"

interface Props {
    message: ChatMessage
    modifier: "self" | ""
}

const MessageBalloon: React.FC<Props> = ({ modifier, message }) => {
    const renderTextMessage = (message: ChatMessage) => {
        return <p className={"message"}>{message.text}</p>
    }

    const renderImageMessage = (message: ChatMessage) => {
        const alt = `Image from ${message.sender.name}`
        return (
            <img
                width={"120px"}
                height={"120px"}
                className={"image"}
                alt={alt}
                src={message.url}
            />
        )
    }

    const renderMessage = (message: ChatMessage) => {
        return "image" === message.type
            ? renderImageMessage(message)
            : renderTextMessage(message)
    }

    return (
        <li className={`MessageBalloon ${modifier}`}>
            <img
                className={"avatar"}
                width={"32px"}
                height={"32px"}
                alt={message.sender.name}
                src={message.sender.avatar}
            />
            <div className={"message-wrapper"}>
                <p className={"sender"}>{message.sender.name}</p>
                {renderMessage(message)}
                <p className={"hour"}>{getHour(message.timestamp)}</p>
            </div>
        </li>
    )
}

export default MessageBalloon
