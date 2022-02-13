import React, { useState } from "react"
import Input from "../../atoms/Input/Input"
import NullTheCat from "../../../assets/images/NullTheCat.png"
import { authContext } from "../../../contexts/AuthContext"
import { getHour } from "../../../utils/Date"
import "./Chat.scss"

/**
 * Notes about the chat component:
 *
 * I would nice to implement an emoji picker, but time runs out!
 */

export interface SendMessageResponse {
    text?: string
    url?: string
}

interface ChatMessage extends SendMessageResponse {
    sender: {
        name: string
        avatar: string
    }
    timestamp: Date
}

const Chat: React.FC = () => {
    const auth = authContext()
    const formRef: React.RefObject<HTMLFormElement> = React.createRef()
    const [messages, setMessages] = useState<ChatMessage[]>([])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const text = formData.get("message") as string

        if (!text || !text.trim().length) {
            return
        }

        const message = {
            sender: {
                name: auth.user,
                avatar: NullTheCat,
            },
            timestamp: new Date(),
            text,
        } as ChatMessage

        setMessages([...messages, message])

        if (formRef.current) {
            formRef.current.reset()
        }
    }

    const renderMessages = () => {
        /**
         * React.Children.toArray manages automatically the children's keys,
         * so we do not have to pass them explicitly
         */
        return (
            <ul className={"message-list"}>
                {React.Children.toArray(
                    messages.map((message) => (
                        <li className={"message-item"}>
                            <img
                                className={"sender"}
                                width={"32px"}
                                height={"32px"}
                                alt={message.sender.name}
                                src={message.sender.avatar}
                            />
                            <span className={"message"}>{message.text}</span>
                            <span className={"hour"}>
                                {getHour(message.timestamp)}
                            </span>
                        </li>
                    ))
                )}
            </ul>
        )
    }

    return (
        <article className="Chat">
            <h2>Chat</h2>

            <div className={"chat-header"}>
                <p>Server</p>
                <p>last seen recently</p>
            </div>

            {renderMessages()}

            <div className={"message-box"}>
                <form ref={formRef} onSubmit={onSubmit}>
                    <Input
                        id={"message"}
                        name={"message"}
                        type={"text"}
                        placeholder={"Write a message..."}
                        aria-required
                    />
                    <input type={"submit"} value={"Send"} />
                </form>
            </div>
        </article>
    )
}

export default Chat
