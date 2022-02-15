import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import ChatHeader from "./ChatHeader"

export default {
    title: "Molecules/ChatHeader",
    component: ChatHeader,
    argTypes: {},
} as ComponentMeta<typeof ChatHeader>

const Template: ComponentStory<typeof ChatHeader> = (args) => (
    <ChatHeader {...args} />
)

export const Default = Template.bind({})

Default.args = {
    receiver: "Server",
    typing: true,
}
