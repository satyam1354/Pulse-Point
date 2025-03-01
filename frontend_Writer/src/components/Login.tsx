import { useState } from "react";

const Login = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [admin, setAdmin] = useState<boolean>(false);
    const submitHandler = async(e:any) =>{
        e.preventDefault();
        const response = await axios.post();
       if(response.data.success){
        console.log("loged in successsfully");
        console.log(response.data)
       }
       else{
        console.log("user does not exist")
       }
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="username" >Username</label>
                <input type="text" name="username" value="" id="username" required />

                <label htmlFor="email" >Email</label>
                <input type="email" name="email" value="" id="email" required />
                
                <label  htmlFor="password">Password</label>
                <input type="text" name="password" value="" id="password" required />

                <button>Submit</button>
            </form>

        </div>
    )
}
export default Login;