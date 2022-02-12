import React from "react"
import { render, screen } from "@testing-library/react"
import Chat from "./Chat"

test("renders default text for the 'Chat' component", () => {
    render(<Chat />)
    const text = screen.getByText(/chat/i)
    expect(text).toBeInTheDocument()
})
