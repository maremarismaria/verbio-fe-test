import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AuthContextProvider } from "../../../contexts/AuthContext"
import AuthWrapper from "../../atoms/AuthWrapper/AuthWrapper"
import Nav from "../../organisms/Nav/Nav"
import Login from "../Login/Login"
import Chat from "../Chat/Chat"
import NotFound from "../NotFound/NotFound"
import Logo from "../../../assets/images/logo.svg"
import { ROUTES } from "../../../constants"
import "./App.scss"
import "react-toastify/dist/ReactToastify.css"

const App: React.FC = () => {
    return (
        <AuthContextProvider>
            <div className="App">
                <header>
                    <h1>Front-End Test</h1>
                    <img className={"logo"} alt={"Verbio"} src={Logo} />
                </header>
                <main role={"main"}>
                    <BrowserRouter>
                        <Nav />
                        <Routes>
                            <Route index element={<Login />} />
                            <Route
                                path={ROUTES.Chat}
                                element={
                                    <AuthWrapper>
                                        <Chat />
                                    </AuthWrapper>
                                }
                            />
                            <Route path={"*"} element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </main>
                <ToastContainer />
            </div>
        </AuthContextProvider>
    )
}

export default App
