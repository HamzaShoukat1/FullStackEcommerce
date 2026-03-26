import { Search } from "lucide-react"




export default function SearchBar() {
    return (
        <div className=" hidden sm:flex  gap-2 items-center rounded-md  ring-gray-200 px-2 py-1 shadow-md" >

            <Search className="w-4 h-4 text-gray-500" />
            <input id="search" placeholder="search..." className="text-sm outline-0" />
        </div>
    )
}
