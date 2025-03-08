import { createContext, useContext, useState } from "react"

const AuthorContext = createContext();

export const AuthorProvider = ({children})=>{
    const [author, setAuthor] = useState(null); // contains id, name etc
    const [authorId, setAuthorId] = useState(null)

    const loginAuthor = (userData: any) =>{
       setAuthor(userData.name)
       setAuthorId(userData._id)
    } 
    const logoutAuthor = () =>{
        setAuthor(null)
        setAuthorId(null)
    }
     
    return (
        <AuthorContext.Provider value={{author, setAuthor, authorId, setAuthorId}} >
            {children}
        </AuthorContext.Provider>
    )
}
// Custom hook to use the context
export const useAuthor = () => useContext(AuthorContext) 
