import { Link } from "react-router-dom";

interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id :string
}
export const BlogCard =({authorName, title, content, publishedDate ,id}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="shadow bottom-1 p-4 cursor-pointer">
     <div className="flex flex-row">
        <div>
         <AvatarComp name={authorName}/> 
        </div>
         <div className="pr-2 pt-1 pl-2 font-serif">
             {authorName}  
            </div>
         <div className="font-extralight pt-1 text-slate-400">&#x2022;</div>  
         <div className="pl-1 font-extralight pt-1 text-slate-400">
            {publishedDate}
        </div> 
            
     </div>
     <div className="font-bold text-lg">
        {title.toLocaleUpperCase()}
     </div>
     <div>
        { content.length > 100 ? (<div dangerouslySetInnerHTML={{
            __html:content.slice(0,100)+"...."}}/>): (<div dangerouslySetInnerHTML={{__html:content}}/>)
        }
    </div>
    </div>
</Link> 
}

export function AvatarComp({name}:{name: string}){
    return <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-light text-sm text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
</div>
}