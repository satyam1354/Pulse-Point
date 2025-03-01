import { useState } from "react";
import axios from 'axios';
const CreateArticle = () =>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("");

const submitHandler = async()=>{
   try {
    const response = axios.post('', {title, description, content},{
        headers:{
         contentType:'application/json';

        }
    });
    if(response.data.success){
        toast(response.data.message)
        console.log(response.data.success)
    }
    else{
        toast(response.data.message)
        console.log(response.data.success) 
    }
   } catch (error) {
    console.log(error)
   }

}
    return(
       <div>
        <h1>Write a New Article</h1>
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Artile Title</label>
            <input type="text" name="title" value="" id="title" placeholder="Article Title" required/>

            <label htmlFor="description">Article Description</label>
            <input type="text" name="description" value="" id="description" placeholder="Write a description of the article"/>
            
            <label htmlFor="content">Write your article here</label>
            <textarea name="content" value="" id="content" placeholder="Wrtie your article here" required/>
           
            <label htmlFor="pic">Images of Article</label>
            <input type="file" name="image"  id="pic" placeholder="Image URL (optional)"/>
           
            <label htmlFor="video">Video of Article</label>
            <input type="video" name="video" id="video" placeholder="Attach Video of Article (Optional)"/>
            
            <button type="submit">Save Draft</button>
            <button type="submit">Publish</button>

        </form>
       </div>
    )
}
export default CreateArticle;