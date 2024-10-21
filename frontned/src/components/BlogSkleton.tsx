export const BlogSkeleton = () => {
    return <div>
        <div className="w-screen flex justify-center">
        <div className="p-4 border-b border-slate-200 pb-4 w-1/2 flex flex-col cursor-pointer">
            <div className="flex items-baseline">
                <div className="h-6 w-6 rounded-full bg-gray-200 "></div>
                <div className="h-4 bg-gray-200 rounded-md w-40 ml-4"></div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    <div className="h-2 bg-gray-200 rounded-md mb-2.5"></div>
                </div>
            </div>
            <div className="h-6 bg-gray-200 rounded-md w-2/4 "></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4 mt-2"></div>
        </div>
        </div>
    <span className="sr-only">Loading...</span>
</div>
}

export const NavSkleton=()=>{
    return <div className="w-full h-14 bg-gray-400 ">

    </div>
}