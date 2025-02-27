import axios from "axios";
import News from './News'
import { useEffect, useState } from "react";
// import { ReactDOM } from "react-router-dom";

type Article = {
    author: String;
    content: String;
    description: String;
    title: String;
    publishedAt: String;
    source: {
        name: String;
        id: number;
    };
    url: string;
    urlToImage: string;
    name: String;
}

const Api = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [selectedArticle, setSelectedAtricle] = useState<Article | null>(null)

    useEffect(() => {
        const load = async () => {
            try {
                const apiKey = import.meta.env.VITE_NEWS_API_KEY;
                const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`);
                const data = await response.json();
                setNews(data.articles || []);
                console.log("news", data.articles)
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        }
        load();
    }, []);

    { console.log("newwwwwwwws", news[0]) }

    return (
        <div>
            {
                selectedArticle ? (
                    <div>
                        <button onClick={() => setSelectedAtricle(null)}>Back to Articles</button>
                        <div className="bg-slate-600 border-2 p-4 m-4">
                            {/* <button onClick={() => setSelectedAtricle(null)}>Back to Articles</button> */}
                            {/* <h1> {selectedArticle.author}</h1>
                            <p> {selectedArticle.description}</p>
                            <h1> {selectedArticle.publishedAt}</h1>
                            <h1> {selectedArticle.title}</h1>
                            <h1> {selectedArticle.source.name}</h1>
                            <h1> {selectedArticle.source.id}</h1> */}
                            <h1> {selectedArticle.content}</h1>
                            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer"
                                className="text-blue-500 underline font-semibold">
                                Read Full Article
                            </a>
                        </div>
                    </div>

                ) : (
                    news.length > 0 ? (
                        news.map((article, index) => (
                            // <News article={news[0]} key={0}/>
                            <div key={index}
                                onClick={() => setSelectedAtricle(article)}
                                className="bg-slate-600 border-2 p-4 m-4">

                                <h1> {article.author}</h1>
                                <p> {article.description}</p>
                                <h1> {article.publishedAt}</h1>
                                <h1> {article.title}</h1>
                                <h1> {article.source.name}</h1>
                            </div>

                        ))
                    ) : (<p>Loading...</p>)
                )
            }
            {/* {} */}
        </div>
    )
}
export default Api;