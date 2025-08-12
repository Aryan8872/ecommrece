import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstContext = createContext()

const FirstContextProvider = ({ children }) => {
    const [userRole, setUserRole] = useState("")   //ADMIN USER duita role 
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()
    const dbData = {
        username: "hello",
        password: "hello123",
        role: "ADMIN"
    }

    const login = (userData) => {
        console.log(userData)
        const proms = new Promise((resolve, reject) => {
            if (userData.email == "user@gmail.com"|"hello@gmail.com" && userData.password=="dmnamwndmn") {
                console.log("resolved")
                resolve("hello")
            } else {
                console.log("rejected ")
                reject("bye")
            }
        })
        proms.then(() => {
            console.log("setting true")
            setIsAuthenticated(true)
            navigate("/")
        }).catch(() => {
            console.log("setting false")
            setIsAuthenticated(false)
        })
    }

    const logout = () => {
        //do logout logic
        setIsAuthenticated(false)
        navigate("/login")
        localStorage.removeItem("authenticated")

    }

    return (
        <FirstContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </FirstContext.Provider>
    )

}

export const useFirst = () => {
    const context = useContext(FirstContext)
    if (!context) throw Error("cannot be used withouut inside the provider")
    return context
}

export default FirstContextProvider