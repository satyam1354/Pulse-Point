import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [admin, setAdmin] = useState<boolean>(false);
    const [login, isLogin] = useState<boolean>(false)

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const submitHandler = async (e: any) => {
        e.preventDefault();
        console.log(e)
        if (login) {
            try {
                const response = await axios.post("http://localhost:3000/api/v1/author/register",
                    { name, password },
                    {
                        headers: { 'content-type': 'application/json' },
                        withCredentials: true
                    }
                );
                console.log(response.data)
                if (response.data.success) {
                    toast.success(response.data.message)
                    console.log("loged in successsfully");
                    console.log(response.data)
                }
                else {
                    toast.success(response.data.message)
                    console.log("user does not exist")
                }
            } catch (error) {
                toast.success("Invalid Credentials")
                console.log(error)
            }
        }
        else{
            try {
                const res = await axios.post("http://localhost:3000/api/v1/author/register", 
                    { email, password},
                    { 
                        headers:{
                            "Content-Type":"application/json"
                        },
                        withCredentials: true
                    }
                );
                console.log(res)
                if(res.data.success){
                    toast.success(res.data.message)
                }else{
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.success("Invalid Credentials")
            }
        }
    }
    return (
        <div className="flex justify-center items-center w-[80%]">
            <form onSubmit={submitHandler} className="flex flex-col">
                { login && (<>
                <label htmlFor="name" >Name</label>
                <input type="text" className="border-2"  name="name"  id="name" required />
                 </> )}
                
                <label htmlFor="email"  >Email</label>
                <input type="email" className="border-2" name="email"  id="email" required />

                <label htmlFor="password">Password</label>
                <input type="text" className="border-2" name="password" id="password" required />

                <button type="submit">Submit</button>
            </form>

        </div>
    )
}
export default Login;