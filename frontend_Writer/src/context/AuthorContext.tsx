import { createContext, useContext, useState } from "react"

const AuthorContext = createContext();

export const AuthorProvider = ({children})=>{
    const [author, setAuthor] = useState(null); // contains id, name etc
    const [authorId, setAuthorId] = useState(null)

    return (
        <AuthorContext.Provider value={{author, setAuthor, authorId, setAuthorId}} >
            {children}
        </AuthorContext.Provider>
    )
}
export const useAuthor = () => useContext(AuthorContext) 
