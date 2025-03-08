import axios from 'axios'
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom'

interface PostArticle {
    title: string,
    description: string,
    content: string,
    tags: string
}
const Article = () => {
    const data = useLoaderData<PostArticle>();
    console.log(data)
    return (
        <>
            <div>
                <div className='w-[80%]  border-2 bg-gray-500 items-center'>
                    <div>{data.title}</div>
                    <div>{data.description}</div>
                    <div>{data.content}</div>
                    <div>{data.tags[0]}</div>
                </div>
            </div>

        </>
    )
}
export default Article

export const ArticleLoader = async ({ params }: LoaderFunctionArgs) => {
    // console.log(params)
    try {
        const response = await axios.get(`${import.meta.env.VITE_ARTICLE_API_END_POINT}/myArticle/${params.id}`);
        return response.data?.article;
    } catch (error) {
        return error;
    }
}