"use client"

import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { useCallback, useState } from "react";




export default function SearchBar() {
    const [value, setvalue] = useState("")
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const handleSearch = useCallback((searchTerm:string) => {
        const params = new URLSearchParams(searchParams.toString());

        if(searchTerm){
            params.set("search", searchTerm);
        }else{
            params.delete("search");
        }
   
     

        router.push(`/products?${params.toString()}`,{scroll: false});
        


       


    }, [router, searchParams])



    return (
        <div className=" hidden sm:flex  gap-2 items-center rounded-md  ring-gray-200 px-2 py-1 shadow-md" >

            <Search className="w-4 h-4 text-gray-500" />
            <input id="search" placeholder="search..." className="text-sm outline-0"
            onChange={e=> setvalue(e.target.value)}
            onKeyDown={e=> {
                if(e.key === "Enter"){
                    handleSearch(value)

                }
            }}
             />
        </div>
    )
}
