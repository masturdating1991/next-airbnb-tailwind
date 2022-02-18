import { useState } from "react"
import { useRouter } from "next/router";
import Image from 'next/image'

import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon } from "@heroicons/react/solid"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from "react-date-range"

const Header = ({ placeholder }) => {
    const [searchInput, setSearchInput] = useState("")
    const [noOfGuests, setNoOfGuests] = useState(1)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const router = useRouter()


    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const selectionRange = {
        startDate,
        endDate,
        key: "selection"
    }

    const searchHandler = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests
            }
        })
    }

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            <div className="relative flex items-center w-24 h-10 cursor-pointer my-auto"
                onClick={() => router.push("/")}>
                <Image
                    src="/img/logo.jpg"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                    alt="logo"
                />
            </div>

            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input type="text" placeholder={placeholder || "Start your search"}
                    className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)} />
                <SearchIcon
                    className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            <div className="flex items-center justify-end space-x-4 text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6" />

                <div className="flex items-center space-x-2 px-2 py-1 border-2 rounded-full cursor-pointer">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>

            {
                searchInput &&
                <div className="flex flex-col col-span-3 mx-auto mt-1">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#fd5b61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                        <UserIcon className="h-5" />
                        <input type="number" className="w-12 pl-2 text-lg text-red-400 outline-none " min={1}
                            value={noOfGuests} onChange={e => setNoOfGuests(e.target.value)} />
                    </div>

                    <div className="flex">
                        <button
                            onClick={() => setSearchInput("")}
                            className="flex-grow text-gray-500 border border-gray-200 rounded-lg mr-2 py-1 hover:scale-95 transition duration-200">Cancel
                        </button>
                        <button
                            onClick={searchHandler}
                            className="flex-grow text-red-400 border border-gray-200 rounded-lg ml-2 py-1 hover:scale-95 transition duration-200">Search
                        </button>
                    </div>
                </div>
            }
        </header>
    )
}

export default Header
