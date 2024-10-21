import { Link } from "react-router-dom"
export const NavBar =({authorName}:{authorName:string})=>{
    return <div className="w-full h-14 border-b-2 flex justify-between">
  <div className="pt-4 pl-8 font-semibold">
    <Link to={"/blogs"}>
    Medium
    </Link>
  </div>
  <div className="pt-2 pr-10">
    <Link to={'/publish'}>
  <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-2xl mr-10 text-sm px-5 py-2.5 me-2 mb-2">New</button>
    </Link>

        <AvatarComp name={authorName}/>
  </div>
    </div>
}
function AvatarComp({name}:{name: string}){
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-light text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    
    </div>
}