import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders default text for the 'App' component", () => {
    render(<App />)
    const text = screen.getByText(/test/i)
    expect(text).toBeInTheDocument()
})
