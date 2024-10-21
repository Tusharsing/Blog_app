import { Quote } from "../components/Quote"
import { Button } from "../components/Button"
import { useState } from "react"
import { Inputbox } from "../components/Inputbox"
import { Link, useNavigate } from "react-router-dom"
import { SigninInputs } from "@tushar0810/medium-common"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const Signin = ()=>{
    const navigate = useNavigate()
    const[loading,setLoading] = useState<boolean>(false);
    const[error,setError] = useState<string | null>(null);
    const [Preinputs,setPreinputs] = useState<SigninInputs>({
     username:"",
     password:""
    })
   
  
    async function sendRequest() {
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, Preinputs,
            {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            
            localStorage.setItem("token",response.data.token);
           
            
            navigate("/blogs");
        } catch (error) {
            // Check if it's an Axios error and handle it
            if (axios.isAxiosError(error) && error.response) {
              if (error.response.status === 401) {
                setError('Invalid email or password. Please try again.');
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

    return <div className="grid grid-cols-1 lg:grid-cols-2">
    <div className="flex justify-center items-center">
    <div className="h-2/3 bg-white w-80 flex justify-center rounded-lg  flex-col items-center">
    <div className="text-2xl  font-extrabold">
                 Login... 
    </div>
    <div className="text-slate-400">
             Don't have an account
        <Link className="underline pl-1 hover:text-slate-500" to={"/signup"}>
             Signup  </Link>
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
        <Inputbox label={"Password"} placeholder={"•••••••••"} onchange={(e)=>{
            setPreinputs({
                ...Preinputs,
                password:e.target.value
            })
        } } type ={"password"} />
    </div>
    <div className="">
        <Button label={loading ? 'Signining..' : 'Signin'} onchange={sendRequest}/>
    </div>
    <div className="text-red-400 h-10 font-semibold underline pt-3">
        {error}
    </div>
</div>
        </div>
   </div>
   <div className="hidden lg:block">
       <Quote/>
   </div>
   </div>
}