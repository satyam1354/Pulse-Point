import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";


const CreateArticle = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [image, setImage] = useState<FileList | null>(null)
    const [video, setVideo] = useState<FileList | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const [action, setAction] = useState<'draft' | 'publish'>('draft');

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("content", content);
            if (image) Array.from(image).forEach((pic) => formData.append("image", pic));
            if (video) Array.from(video).forEach((file) => formData.append("video", file));
            formData.append("tags", JSON.stringify(tags))
            formData.append("action", action)

            const response = await axios.post('http://localhost:3000/api/v1/article/createArticle', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                }
            );
            console.log(response.data)
            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Article not created")
            console.log(error)
        }
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center mt-20">
            <div className="w-[60%] ">
                <h1 className="text-3xl font-bold">Write an Article</h1>

                <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-6" encType="multipart/form-data">

                    <label htmlFor="title" className="font-bold text-mg">Title:</label>
                    <input type="text" name="title" className="border border-gray-300 rounded-md  p-2" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter article title" required />

                    <label htmlFor="description" className="font-bold text-mg">Description:</label>
                    <textarea name="description" className="border border-gray-300 rounded-md  p-2" value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Write a brief description" />

                    <label htmlFor="content" className="font-bold text-mg">Content:</label>
                    <textarea name="content" className="border border-gray-300 rounded-md  p-2 h-40" value={content} onChange={(e) => setContent(e.target.value)} id="content" placeholder="Write your article content" required />

                    <label htmlFor="image" className="font-bold text-mg">Images of Article:</label>
                    <input type="file" name="image" className="border border-gray-300 rounded-md  p-2" onChange={(e) => setImage(e.target.files)} id="image" multiple />

                    <label htmlFor="video" className="font-bold text-mg">Video of Article</label>
                    <input type="file" name="video" className="border border-gray-300 rounded-md  p-2" onChange={(e) => setVideo(e.target.files)} id="video" multiple />

                    <label htmlFor="tags" className="font-bold text-mg">Tags (Comma Separated):</label>
                    <input type="text" name="tags" className="border border-gray-300 rounded-md  p-2" value={tags.join(", ")} onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))} id="tags" placeholder="e.g. AI, Technology, future" />

                    <div className="py-4 ">
                        <button className="border-2 px-2 py-1 rounded-lg bg-green-400 mr-4 cursor-pointer" type="submit" onClick={() => setAction('draft')}>Save Draft</button>
                        <button className="border-2 px-2 py-1 rounded-lg bg-red-400 cursor-pointer" type="submit" onClick={() => setAction('publish')}>Publish</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default CreateArticle;