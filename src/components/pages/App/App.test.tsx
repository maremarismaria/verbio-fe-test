import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("Renders default text for the 'App' component", () => {
    render(<App />)
    const text = screen.getByText(/Front-End Test/i)
    expect(text).toBeInTheDocument()
})
