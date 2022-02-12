import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../Login/Login"
import Chat from "../Chat/Chat"
import NotFound from "../NotFound/NotFound"
import "./App.scss"

const App: React.FC = () => {
    return (
        <div className="App">
            <header>
                <h1>Verbio Front-End Test</h1>
            </header>
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <footer>Footer</footer>
        </div>
    )
}

export default App
