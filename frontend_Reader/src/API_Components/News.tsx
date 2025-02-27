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
const News = (props: Article) => {
    return (
        <>
            {console.log("props", props) }
            <div className="bg-slate-600 border-2 m-4">
                <h1> {props.author}</h1>
                <h1> {props.content}</h1>
                <p> {props.description}</p>
                <h1> {props.publishedAt}</h1>
                <h1> {props.title}</h1>
                <h1> {props.source.name}</h1>
            </div>

        </>
    )
}
export default News;