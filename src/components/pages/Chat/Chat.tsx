import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { authContext } from "../../../contexts/AuthContext"
import { BotMessage } from "../../../API/API.def"
import {
    ROUTES,
    DEFAULT_ERROR_MESSAGE,
    SERVER_TYPING_INTERVAL,
    TOAST_CLOSING_DELAY,
} from "../../../constants"
import ChatRoom from "../../organisms/ChatRoom/ChatRoom"
import NullTheCat from "../../../assets/images/NullTheCat.png"
import MochaTheChihuahua from "../../../assets/images/MochaTheChihuahua.jpg"
import "./Chat.scss"

/**
 * Notes about the chat component:
 *
 * NTH implement an emoji picker, but time runs out!
 * NTH initialize messages list using Local Storage
 * NTH make the chat image clickable for full size preview
 * NTH keep scroll on the bottom after sending or receiving messages
 */

export interface ChatMessage extends BotMessage {
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
            }, SERVER_TYPING_INTERVAL)
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
            autoClose: TOAST_CLOSING_DELAY,
            closeOnClick: true,
            type: toast.TYPE.ERROR,
            position: toast.POSITION.TOP_RIGHT,
        }

        toast(error, toastOptions)
    }

    return (
        <ChatRoom
            isUser={isUser}
            receiver={"Server"}
            messages={messages}
            typing={serverTyping}
            onSubmit={onSubmit}
        />
    )
}

export default Chat
