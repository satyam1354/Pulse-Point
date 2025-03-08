import { Routes, Route, BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../components/Login'
import CreateArticle from '../components/CreateArticle';
import MyArticles from '../components/MyArticles';
import Home from './HomePage/Home';
import Article, {ArticleLoader} from './Article';

const router = createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/home",
        element:<Home/>,
    },
    // {
    //     path:"/myArticles",
    //     element:<MyArticles/>
    // },
    {
        path:"/createArticle",
        element:<CreateArticle/>
    },
    {
        path:"/myArticle/:id",
        element: <Article/>,
        loader: ArticleLoader
    }
])
const Container = () => {
    return (
        <div>
            {/* <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home/>} />
                <Route path='/myArtiles' element={<MyArticles />} />
                <Route path="/createArticle" element={<CreateArticle />} />
            </Routes>
            <hr /> */}
            {/* <CreateArticle/> */}
            <RouterProvider router={router}/>
        </div>

    )
}
export default Container;