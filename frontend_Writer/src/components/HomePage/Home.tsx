import { useNavigate } from "react-router-dom"
import MyArticles from "../MyArticles"

const Home  = ()=>{
    const navigate =useNavigate()
    return(
        <>
        <div className="w-60 h-4 border-2 bg-gray-300 text-rose-400 p-4" onClick={()=>{navigate('createArticle')}}>create Article</div>
        <MyArticles/>
        </>
    )
}
export default Home