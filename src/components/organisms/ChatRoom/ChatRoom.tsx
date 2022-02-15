import React from "react"
import ChatHeader, {
    Props as ChatHeaderProps,
} from "../../molecules/ChatHeader/ChatHeader"
import MessageBox, {
    Props as MessageBoxProps,
} from "../../molecules/MessageBox/MessageBox"
import MessageBalloon from "../../molecules/MessageBalloon/MessageBalloon"
import { ChatMessage } from "../../pages/Chat/Chat"
import "./ChatRoom.scss"

interface Props extends ChatHeaderProps, MessageBoxProps {
    isUser: (name: string) => boolean
    messages: ChatMessage[]
}

const ChatRoom: React.FC<Props> = ({
    isUser,
    messages,
    onSubmit,
    receiver,
    typing,
}) => {
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
                            <MessageBalloon
                                modifier={modifier}
                                message={message}
                            />
                        )
                    })
                )}
            </ul>
        )
    }

    return (
        <article className="Chat">
            <ChatHeader receiver={receiver} typing={typing} />
            {renderMessages()}
            <MessageBox onSubmit={onSubmit} />
        </article>
    )
}

export default ChatRoom
