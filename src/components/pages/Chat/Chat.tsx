import React, { useEffect, useState } from "react"
import Input from "../../atoms/Input/Input"
import { authContext } from "../../../contexts/AuthContext"
import { getHour } from "../../../utils/Date"
import { BotMessage } from "../../../API/API"
import NullTheCat from "../../../assets/images/NullTheCat.png"
import MochaTheChihuahua from "../../../assets/images/MochaTheChihuahua.jpg"
import "./Chat.scss"

/**
 * Notes about the chat component:
 *
 * I would nice to implement an emoji picker, but time runs out!
 * Nice to have: initialize messages list using Local Storage
 */

interface ChatMessage extends BotMessage {
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

    useEffect(() => {
        getWelcomeMessage()
    }, [])

    const updateMessages = (message: ChatMessage) => {
        setMessages((currentMessages) => [...currentMessages, message])
    }

    const parseMessage = (sender: string, avatar: string, text: string) => {
        return {
            sender: {
                name: sender,
                avatar,
            },
            timestamp: new Date(),
            text,
            // TODO Image type
            type: "",
        }
    }

    const setServerMessages = (messages: BotMessage[] | undefined) => {
        if (messages && !!messages.length) {
            for (let i = 0; i < messages.length; i++) {
                const text = messages[i].text || ""
                const message = parseMessage("Server", MochaTheChihuahua, text)
                updateMessages(message)
            }
        }
    }

    const getWelcomeMessage = async () => {
        try {
            const messages = await auth.getWelcomeMessage()
            setServerMessages(messages)
        } catch (e) {
            console.error(e.toString())
        }
    }

    const sendMessage = async (text: string) => {
        try {
            const messages = await auth.sendMessage(text)
            const userMessage = parseMessage(auth.user, NullTheCat, text)
            updateMessages(userMessage)

            // TODO Image type
        } catch (e) {
            console.error(e.toString())
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const text = formData.get("message") as string

        if (!text || !text.trim().length) {
            return
        }

        sendMessage(text)

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
                                className={"avatar"}
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
                <p className={"receiver"}>Server</p>
                <p className={"status"}>Online</p>
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
