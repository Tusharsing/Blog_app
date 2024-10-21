import { Blog } from "../hooks"

export const DetailBlog =({blog}:{blog:Blog})=>{

    return <div className="grid grid-col-3 lg:grid-cols-5">
    <div className="col-span-3 h-screen flex flex-col justify-center items-center">
      <div className="border-black w-11/12 h-screen bg-white mt-8">
     <div className="text-5xl font-extrabold  mb-3">{blog.title}</div>
     <div className=" text-slate-500 mb-3">Posted on 02-02-2008</div>
     <div className="text-lg ">
     <div dangerouslySetInnerHTML={{__html:blog.content}}></div></div>
    </div>   
    </div>
    <div className="hiddenlg:block  col-span-2 bg-white h-svh">
       <div className="flex flex-col items-start mt-8 h-3/4 ml-3">
        <div className="text-2xl font-bold text-slate-500">
        Author name 
        </div>
        <div className="text-4xl mb-2">
         {blog.author.name || "Anonymous"}
        </div>
        <div className="font-light text-sm">
          Random catch phrase can be taken from bkend
        </div>
       </div>
    </div>
  </div>
  
}