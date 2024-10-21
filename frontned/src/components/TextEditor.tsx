import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const TextEditor = () => {
    const editor = useRef(null);
    const navigate =useNavigate();
    const[content,setcontent] =useState("");
    const[title,settitle] =useState("");

    return <div>
        <div className=" pl-10 pt-5">
            <label className="block mb-2 text-2xl font-semibold text-slate-900">Title</label>
            <input  onChange={(e)=>{
            settitle(e.target.value);
         }} type="text" className="block p-2.5 w-3/4 h-14 text-sm bg-gray-50 rounded-lg border" placeholder="Title..."></input>
        </div>
        <div className=" pl-10 pt-5 pr-5">
            <label className="block mb-2 text-2xl font-medium text-gray-900">Description</label>
            {/* <textarea  className="block p-2.5 w-3/4 h-80 text-sm overflow-y-auto bg-gray-50 rounded-lg border" placeholder="Write your thoughts here..."></textarea> */}
            <JoditEditor  
            ref={editor}
            value={content}
            onChange={newcontent=>{setcontent(newcontent)}}/>
        </div>
         <div className="pl-10 pt-5">
         <button onClick={async()=>{
         const  response =  await axios.post(`${BACKEND_URL}/api/v1/blog/create`,{
             title:title,
             content:content
         },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
         })
            navigate(`/blog/${response.data.id}`)
         }} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-2xl mr-10 text-sm px-5 py-2.5 me-2 mb-2">Post</button>
         {content}
         </div>
    </div>
}