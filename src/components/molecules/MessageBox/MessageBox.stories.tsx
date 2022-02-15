import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import MessageBox from "./MessageBox"

export default {
    title: "Molecules/MessageBox",
    component: MessageBox,
    argTypes: {},
} as ComponentMeta<typeof MessageBox>

const Template: ComponentStory<typeof MessageBox> = (args) => (
    <MessageBox {...args} />
)

export const Default = Template.bind({})

Default.args = {
    onSubmit: () => {},
}
