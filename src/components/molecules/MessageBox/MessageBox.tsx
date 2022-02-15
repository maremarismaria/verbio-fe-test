import React from "react"
import Input from "../../atoms/Input/Input"
import "./MessageBox.scss"

export interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const MessageBox: React.FC<Props> = ({ onSubmit }) => {
    return (
        <div className={"MessageBox"}>
            <form onSubmit={onSubmit}>
                <Input
                    id={"message"}
                    name={"message"}
                    type={"text"}
                    placeholder={"Write a message..."}
                    autoComplete={"off"}
                    aria-required
                />
                <button type={"submit"} aria-label={"Send"}>
                    &#10148;
                </button>
            </form>
        </div>
    )
}

export default MessageBox
