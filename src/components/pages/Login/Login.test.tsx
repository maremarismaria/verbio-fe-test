import React from "react"
import { render, screen } from "@testing-library/react"
import Login from "./Login"

test("renders default text for the 'Login' component", () => {
    render(<Login />)
    const text = screen.getByText(/login/i)
    expect(text).toBeInTheDocument()
})
