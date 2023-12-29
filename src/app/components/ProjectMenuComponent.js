import { useEffect, useState } from "react"
import TaskMenuComponent from "./TaskMenuComponent"

export default function ProjectMenuComponent(props) {
    const [show, setShow] = useState(false)
    const [hoverTimeout, setHoverTimeout] = useState(null)

    const handleMouseEnter = () => {
        const timeout = setTimeout(() => {
            setShow(true)
        }, 500) // 500 milliseconds delay
        setHoverTimeout(timeout)
    }

    const handleMouseLeave = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setHoverTimeout(null)
        }
        setShow(false)
    }

    const handleClick = () => {

    }

    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout)
            }
        }
    }, [hoverTimeout])

    // ProjectMenuComponent.js
return (
    <div onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className='flex flex-col w-72 ml-4 mr-4 text-gray-400 p-2'>
            <button type="button" className="flex flex-row justify-between hover:text-black font-bold ">
                <div>Projects</div>
                <div>down</div>
            </button>
            {show ?
            <div className="flex flex-col justify-start animate-rollout">
                <TaskMenuComponent />
                <TaskMenuComponent />
                <TaskMenuComponent />
                <TaskMenuComponent />
            </div> :
            ""}
        </div>
    </div>
)

}
