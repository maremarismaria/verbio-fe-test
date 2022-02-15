import React, { FormEvent } from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import NullTheCat from "../../../assets/images/NullTheCat.png"
import MochaTheChihuahua from "../../../assets/images/MochaTheChihuahua.jpg"

import ChatRoom from "./ChatRoom"
import { BotMessageType } from "../../../API/API.def"

export default {
    title: "Organisms/ChatRoom",
    component: ChatRoom,
    argTypes: {},
} as ComponentMeta<typeof ChatRoom>

const Template: ComponentStory<typeof ChatRoom> = (args) => (
    <ChatRoom {...args} />
)

export const Default = Template.bind({})

const messages = [
    {
        text: "Hi, my name is Null the Cat",
        type: "text" as BotMessageType,
        sender: {
            name: "Null the Cat",
            avatar: NullTheCat,
        },
        timestamp: new Date(),
    },
    {
        text: "Hi there! I am Mocha, nice to meet you",
        type: "text" as BotMessageType,
        sender: {
            name: "Mocha",
            avatar: MochaTheChihuahua,
        },
        timestamp: new Date(),
    },
]

Default.args = {
    isUser: (name) => name === "Mocha",
    receiver: "Null",
    messages: messages,
    typing: false,
    onSubmit: (e: FormEvent) => {
        e.preventDefault()
    },
}
