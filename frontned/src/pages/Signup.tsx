import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"
export const Signup = ()=>{
    return <div className="grid gird-cols-1 lg:grid-cols-2">
    <div>
       <Auth/>
   </div>
   <div className="hidden lg:block">
       <Quote/>
   </div>
   </div>
}