import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import NullTheCat from "../../../assets/images/NullTheCat.png"
import MochaTheChihuahua from "../../../assets/images/MochaTheChihuahua.jpg"

import MessageBalloon from "./MessageBalloon"

export default {
    title: "Molecules/MessageBalloon",
    component: MessageBalloon,
    argTypes: {},
} as ComponentMeta<typeof MessageBalloon>

const Template: ComponentStory<typeof MessageBalloon> = (args) => (
    <MessageBalloon {...args} />
)

export const FromServer = Template.bind({})

FromServer.args = {
    message: {
        text: "Hi, I'm a bot!",
        type: "text",
        sender: {
            name: "Server",
            avatar: NullTheCat,
        },
        timestamp: new Date(),
    },
    modifier: "",
}

export const FromServerWithImage = Template.bind({})

FromServerWithImage.args = {
    message: {
        type: "image",
        url: "https://cataas.com/cat",
        sender: {
            name: "Server",
            avatar: NullTheCat,
        },
        timestamp: new Date(),
    },
    modifier: "",
}

export const FromUser = Template.bind({})

FromUser.args = {
    message: {
        text: "Hi there! Nice to meet you",
        type: "text",
        sender: {
            name: "John Doe",
            avatar: MochaTheChihuahua,
        },
        timestamp: new Date(),
    },
    modifier: "self",
}
