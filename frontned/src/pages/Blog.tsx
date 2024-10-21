import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { DetailBlog } from "../components/DetailBlog";
import { NavBar } from "../components/NavBar";
import { BlogSkeleton, NavSkleton } from "../components/BlogSkleton";

export const Blog =()=>{
   const { id } = useParams()
    const {loading,blog} = useBlog({
      id : id || ""
    });

    if(loading){
       return <div>
      <NavSkleton/>
         <div>
      <BlogSkeleton/>
         </div>
       </div>
    } 

    return <div>
      <NavBar authorName={"Anonymus"}/>
       <DetailBlog blog={blog}/>
    </div>
}
