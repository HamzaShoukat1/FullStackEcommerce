"use client"

import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { useCallback, useState } from "react";

export default function SearchBar() {
    const [value, setvalue] = useState("")
    const [isOpen, setIsOpen] = useState(false) // State to toggle mobile search
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleSearch = useCallback((searchTerm: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) {
            params.set("search", searchTerm);
        } else {
            params.delete("search");
        }
        router.push(`/products?${params.toString()}`, { scroll: false });
        setIsOpen(false); // Close mobile bar after searching
    }, [router, searchParams])

    return (
        <div className="flex items-center">
            {/* Mobile Icon Button: Only visible when search is NOT open on small screens */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="p-2 sm:hidden text-gray-500"
                >
                    <Search className="w-5 h-5" />
                </button>
            )}

            {/* The Search Bar Container */}
            <div className={`
                ${isOpen ? "flex absolute left-0 right-0 px-4 bg-white z-10" : "hidden"} 
                sm:flex sm:static sm:bg-transparent items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md
            `}>
                <Search className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => handleSearch(value)} />
                
                <input 
                    id="search" 
                    autoFocus={isOpen}
                    placeholder="search..." 
                    className="text-sm outline-0 flex-1 py-1"
                    onChange={e => setvalue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") handleSearch(value)
                    }}
                />

                {/* Close button for mobile */}
                {isOpen && (
                    <button onClick={() => setIsOpen(false)} className="sm:hidden">
                        <X className="w-4 h-4 text-gray-400 cursor-pointer" />
                    </button>
                )}
            </div>
        </div>
    )
}
