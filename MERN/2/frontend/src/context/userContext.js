import { createContext,useState } from "react";


export const UserContext = createContext()

const UserContextProvider = (props) => {
    const [ userName,setUsername ] = useState(null)
    const [ token,setToken ] = useState(null)


    const setContext = (username,token) => {
        setUsername(username)
        setToken(token)

    }
    
    return (
        <UserContext.Provider value={{userName,token,setContext}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider