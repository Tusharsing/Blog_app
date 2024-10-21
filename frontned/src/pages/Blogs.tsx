import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton, NavSkleton } from "../components/BlogSkleton";
import { NavBar } from "../components/NavBar"
import { useBlogs } from "../hooks"

export const Blogs =()=>{
   const {blogs,loading} = useBlogs();
   
   if(loading){
      return <div >
         <NavSkleton/>
         <div className="flex justify-center">
         <div>
         <BlogSkeleton/>
         <BlogSkeleton/>
         <BlogSkeleton/>
         <BlogSkeleton/>
         <BlogSkeleton/>
         <BlogSkeleton/>
         <BlogSkeleton/>
         <BlogSkeleton/>
         <BlogSkeleton/>
         <BlogSkeleton/>
         </div>
         </div>
      </div>
   } 
    return <div className="flex flex-col items-center">
         <NavBar authorName={"Anonmyus"}/>
         <div className="w-1/2">
            <div>
         {blogs.map(blog=> <BlogCard  
           authorName={blog.author.name || "Anonymous"}
           title={blog.title}
           content={blog.content}
           publishedDate={"02-09-2024"}
           id={blog.id}
           />)}
           </div>
         </div>
       </div>
}
{/* <BlogCard 
           authorName={blog.author.name}
           title={blog.title}
           content={blog.content}
           publishedDate="2nd march 2024"
           /> */}