import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("search"))
    const [search, setSearch] = useState("");
    const [location,setLocation] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ search: "indore", location: "indore" });
        console.log(search,location);
    }   
    return (
        <div className="hidden md:flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm w-full max-w-2xl flex-shrink">
            <input
                name="location"
                value={location}
                type="text"
                placeholder="Location"
                className="w-1/3 px-2 text-sm focus:outline-none"
                onChange={(e) => setLocation(e.target.value)}
            />
            <span className="border-l h-6 mx-2" />
            <input
                type="text"
                value={search}
                name="search"
                placeholder="What are you looking for?"
                className="w-2/3 px-2 text-sm focus:outline-none"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ml-2 bg-blue-600 p-2 rounded-full text-white" onClick={handleSearch}>
                <FaSearch size={14} />
            </button>
        </div>
    )
}