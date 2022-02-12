import React from "react"
import { render, screen } from "@testing-library/react"
import NotFound from "./NotFound"

test("renders default text for the 'Not Found' component", () => {
    render(<NotFound />)
    const text = screen.getByText(/not found/i)
    expect(text).toBeInTheDocument()
})
