import axios from "axios"
import { useEffect, useState } from "react"

type Article = {
    title: string;
    description: string;
}
const MyArticles = () => {
    const [article, setArticle] = useState<Article[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                //const token = localStorage.get('token'); //it will be sent during login 
                const response = await axios.get<{articles: Article[]}>(`${import.meta.env.VITE_ARTICLE_API_END_POINT}/getMyArticles`,
                    {
                        // headers: {
                        //     Authorization: `Bearer ${token}`,
                        // }
                        withCredentials: true //If the token’s in cookies instead:
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
        <div>
            <div>
                {article.length > 0 ? (
                    article.map((item, index) => (
                        <div key={index}>
                            <h1>{item.title}</h1>
                            <h1>{item.description}</h1>
                        </div>
                    ))
                ) : (
                    <p>No Articles found..</p>
                )
                }

            </div>
        </div>
    )
}
export default MyArticles;