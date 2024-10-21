import { Link, useNavigate } from "react-router-dom"
import { Inputbox } from "./Inputbox"
import { useState } from "react"
import { SignupInputs } from "@tushar0810/medium-common"
import { Button } from "./Button"
import axios  from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ()=>{
    const navigate = useNavigate();
    const[loading,setLoading] =useState<boolean>(false);
    const[error,setError] = useState<string | null>(null);
    const [Preinputs,setPreinputs] = useState<SignupInputs>({
     username:"",
     password:"",
     name:""
    })
   
    async function sendRequest() {
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, Preinputs,
            {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            
            localStorage.setItem("token",response.data.token);
            navigate("/blogs");
        } catch(error) {
            if(axios.isAxiosError(error) && error.response){
             if(error.response.status == 411){
                setError('Wrong Formate of Input Crenditals')
             } else {
                setError('Something went wrong. Please try again later.');
              }
            } else {
              setError('Unable to connect. Check your network connection.');
            }
          } finally {
            setLoading(false); // Re-enable button after request
          }
        };
      
return <div className="h-screen bg-white flex justify-center flex-col items-center">
    <div className="text-2xl font-extrabold ">
       Create an Account
    </div>
    <div className="text-slate-400">
        Already have an account?
        <Link className="underline pl-1 hover:text-slate-500" to={"/signin"}>
            Signin</Link>
    </div>
    <div className="text-start w-56">
    <div>
        <Inputbox label={"Email"} placeholder={"abc@abc.abc"} onchange={(e)=>{
            setPreinputs({
                ...Preinputs,
                username:e.target.value
            })
        }} />
    </div>
     <div>
        <Inputbox label={"Name"} placeholder={"Name"} onchange={(e)=>{
            setPreinputs({
                ...Preinputs,
                name:e.target.value
            })
        }} />
    </div>  
    <div>
        <Inputbox label={"Password"} placeholder={"•••••••••"} onchange={(e)=>{
            setPreinputs({
                ...Preinputs,
                password:e.target.value
            })
        } } type ={"password"} />
    </div>
    <div className="">
        <Button label={loading ? 'wait' : 'signup'} onchange={sendRequest}/>
    </div>
    <div className="text-red-400 h-10 font-semibold underline pt-3">
        {error}
    </div>
</div>
        </div>
}


