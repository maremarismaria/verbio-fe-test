import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "../../../contexts/AuthContext"
import AuthWrapper from "../../atoms/AuthWrapper/AuthWrapper"
import Nav from "../../organisms/Nav/Nav"
import Login from "../Login/Login"
import Chat from "../Chat/Chat"
import NotFound from "../NotFound/NotFound"
import Logo from "../../../assets/images/logo.svg"
import "./App.scss"

const App: React.FC = () => {
    return (
        <AuthContextProvider>
            <div className="App">
                <header>
                    <img alt={"Verbio"} src={Logo} />
                    <h1>Front-End Test</h1>
                </header>
                <main role={"main"}>
                    <BrowserRouter>
                        <Nav />
                        <Routes>
                            <Route index element={<Login />} />
                            <Route
                                path="/chat"
                                element={
                                    <AuthWrapper>
                                        <Chat />
                                    </AuthWrapper>
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </main>
                <footer>Footer</footer>
            </div>
        </AuthContextProvider>
    )
}

export default App
