import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {  NavLink} from "react-router-dom";
import { useAuthor } from "../context/AuthorContext";

type Article = {
    title: string;
    description: string;
    _id: string,
    createdAt: string
}
const MyArticles = () => {
    const { authorId } = useAuthor()
    const [article, setArticle] = useState<Article[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                //const token = localStorage.get('token'); //it will be sent during login 
                const response = await axios.get<{articles: Article[]}>(`${import.meta.env.VITE_ARTICLE_API_END_POINT}/getMyArticles/67c6a111ce1c1c10ae4603f6`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true 
                    }
                );
                console.log(response.data)
                setArticle(response.data.articles || []);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        }
        loadData();
    }, []);

    return (
        <div className="w-screen h-screen">
            <div className="w-[80%] bg-gray-200 gap-5 m-5">
                {article.length > 0 ? (
                    article.map((item, index) => (
                        <div key={index} className="border-2 m-5 p-4">
                            <NavLink to={`/myArticle/${item._id}`}>{item.title}</NavLink>
                            <h1>{item.description}</h1>
                            <div>{item.createdAt}</div>

                        </div>
                    ))
                ) : (
                    <p className="border-2 text-xl text-red-400">No Articles found..</p>
                )
                }

            </div>
        </div>
    )
}
export default MyArticles;