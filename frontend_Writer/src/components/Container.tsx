import { Routes, Route } from 'react-router-dom'
import Login from '../components/Login'
import CreateArticle from '../components/CreateArticle';
import MyArticles from '../components/MyArticles';
import Home from './HomePage/Home';

const Container = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home/>} />
                <Route path='/myArtiles' element={<MyArticles />} />
                <Route path="/createArticle" element={<CreateArticle />} />
            </Routes>

            <Login />
            <hr />
            {/* <CreateArticle/> */}
        </div>

    )
}
export default Container;