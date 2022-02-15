import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import Form from "./Form"

export default {
    title: "Molecules/Form",
    component: Form,
    argTypes: {},
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />

export const Login = Template.bind({})

Login.args = {
    action: () => {},
}
