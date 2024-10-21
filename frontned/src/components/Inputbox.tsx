import { ChangeEvent } from "react"

interface LabelInput {
    label :string;
    placeholder:string;
    onchange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}
export const Inputbox = ({label,placeholder,onchange,type}:LabelInput)=>{
    return <div>
         <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <input onChange={onchange} type={type || "text"} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}