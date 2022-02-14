import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"
import { BotMessage } from "../../../API/API"
import { getHour } from "../../../utils/Date"
import Input from "../../atoms/Input/Input"
import NullTheCat from "../../../assets/images/NullTheCat.png"
import MochaTheChihuahua from "../../../assets/images/MochaTheChihuahua.jpg"
import { DEFAULT_ERROR_MESSAGE, ROUTES } from "../../../constants"
import "./Chat.scss"

/**
 * Notes about the chat component:
 *
 * NTH implement an emoji picker, but time runs out!
 * NTH initialize messages list using Local Storage
 * NTH update sender status from online to typing
 * NTH make the chat image clickable for full size preview
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
    const navigate = useNavigate()
    const formRef: React.RefObject<HTMLFormElement> = React.createRef()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [serverTyping, setServerTyping] = useState(false)

    useEffect(() => {
        if (!messages.length) {
            getWelcomeMessage()
        }
    }, [])

    const isUser = (name: string) => {
        return auth.session.user.name === name
    }

    const updateMessages = (message: ChatMessage) => {
        setMessages((currentMessages) => [...currentMessages, message])
    }

    const parseMessage = (
        sender: string,
        avatar: string,
        message: BotMessage
    ) => {
        return {
            ...message,
            timestamp: new Date(),
            sender: {
                name: sender,
                avatar,
            },
        } as ChatMessage
    }

    const setServerMessages = (messages: BotMessage[] | undefined) => {
        if (messages && !!messages.length) {
            let i = 0
            const intervalId = setInterval(() => {
                setServerTyping(true)
                const message = parseMessage("Server", MochaTheChihuahua, {
                    ...messages[i],
                })
                updateMessages(message)
                i++
                if (i === messages.length) {
                    setServerTyping(false)
                    clearInterval(intervalId)
                }
            }, 1500)
        }
    }

    const setUserMessage = (text: string) => {
        const message = parseMessage(auth.session.user.name, NullTheCat, {
            text,
            type: "text",
        })

        updateMessages(message)
    }

    const getWelcomeMessage = async () => {
        try {
            const response = await auth.getWelcomeMessage()
            !!response.error
                ? renderError(response.error)
                : setServerMessages(response.data)
        } catch (e) {
            renderError(DEFAULT_ERROR_MESSAGE)
        }
    }

    const sendMessage = async (text: string) => {
        try {
            const response = await auth.sendMessage(text)

            if (!!response.error) {
                renderError(response.error)
            } else {
                if (text !== "image") {
                    setUserMessage(text)
                } else {
                    setUserMessage(text)
                    setServerMessages(response.data)
                }
            }
        } catch (e) {
            renderError(DEFAULT_ERROR_MESSAGE)
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

    const renderError = (error: string) => {
        const toastOptions = {
            onClose: () => {
                auth.logout(() => navigate(ROUTES.Login))
                toast.dismiss()
            },
            autoClose: 6000,
            closeOnClick: true,
            type: toast.TYPE.ERROR,
            position: toast.POSITION.TOP_RIGHT,
        }

        toast(error, toastOptions)
    }

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

    const renderMessages = () => {
        /**
         * React.Children.toArray manages automatically the children's keys,
         * so we do not have to pass them explicitly
         */
        return (
            <ul className={"message-list"}>
                {React.Children.toArray(
                    messages.map((message) => {
                        const isSelf = isUser(message.sender.name)
                        const modifier = isSelf ? "self" : ""
                        return (
                            <li className={`message-item ${modifier}`}>
                                <img
                                    className={"avatar"}
                                    width={"32px"}
                                    height={"32px"}
                                    alt={message.sender.name}
                                    src={message.sender.avatar}
                                />
                                <div className={"message-wrapper"}>
                                    <p className={"sender"}>
                                        {message.sender.name}
                                    </p>
                                    {renderMessage(message)}
                                    <p className={"hour"}>
                                        {getHour(message.timestamp)}
                                    </p>
                                </div>
                            </li>
                        )
                    })
                )}
            </ul>
        )
    }

    return (
        <article className="Chat">
            <div className={"chat-header"}>
                <p className={"receiver"}>Server</p>
                <p className={"status"}>
                    {serverTyping ? "Typing..." : "Online"}
                </p>
            </div>

            {renderMessages()}

            <div className={"message-box"}>
                <form ref={formRef} onSubmit={onSubmit}>
                    <Input
                        id={"message"}
                        name={"message"}
                        type={"text"}
                        placeholder={"Write a message..."}
                        autoComplete={"off"}
                        aria-required
                    />
                    <button type={"submit"} aria-label={"Send"}>
                        &#10148;
                    </button>
                </form>
            </div>
        </article>
    )
}

export default Chat
