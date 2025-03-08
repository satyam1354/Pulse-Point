import { useNavigate } from "react-router-dom"
import MyArticles from "../MyArticles"
import CreateArticle from "../CreateArticle"

const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="">
                <div>
                    <button className="w-[80%] m-auto h-20  border-2 bg-gray-300 text-blue-400 text-2xl font-bold" onClick={() => { navigate('/createArticle') }}>create Article</button>

                </div>
                <div>
                    <MyArticles />
                </div>
                {/* <CreateArticle/> */}
            </div>

        </>
    )
}
export default Home