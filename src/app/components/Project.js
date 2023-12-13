"use client"
import { useEffect, useState } from "react"
import MenuComponent from "./MenuComponent"



export default function Project() {

    const [clicked, setClicked] = useState(false)
    
    const handleClick = () => {
        setClicked(i => !i)
        console.log("hi")
    }
    useEffect(() => {

    }, [clicked])

    return(
        <div>
            <div  className='flex flex-col  w-72 ml-4 mr-4 text-gray-400  p-2'>
                <button type="button" onClick={handleClick} className="flex flex-row justify-between hover:text-black font-bold ">
                    <div>Projects</div>
                    <div>down</div>
                </button>
                {clicked?
                <div className="flex flex-col justify-start">
                    <MenuComponent />
                    <MenuComponent />
                    <MenuComponent />
                    <MenuComponent />
                </div>:
                ""}
          </div>
        </div>
    )
}