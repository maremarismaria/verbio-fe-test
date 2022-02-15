import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import Input from "./Input"

export default {
    title: "Atoms/Input",
    component: Input,
    argTypes: {},
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Text = Template.bind({})

Text.args = {
    id: "user",
    name: "user",
    type: "text",
    placeholder: "Username",
    autoComplete: "username",
    "aria-required": true,
}

export const Password = Template.bind({})

Password.args = {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "current-password",
    "aria-required": true,
}

export const Submit = Template.bind({})

Submit.args = {
    type: "submit",
    value: "Login",
}
