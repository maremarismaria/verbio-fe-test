import React from "react"
import "./Input.scss"

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

const Input: React.FC<Props> = ({ className, ...props }) => {
    return <input className={`Input ${className || ""}`} {...props} />
}

export default Input
