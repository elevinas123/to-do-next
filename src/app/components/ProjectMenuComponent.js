import { useEffect, useState } from "react"
import TaskMenuComponent from "./TaskMenuComponent"

export default function ProjectMenuComponent(props) {
    const [show, setShow] = useState(false)
    const [hoverTimeout, setHoverTimeout] = useState(null)
    const [taskMenuComponents, setTaskMenuComponents] = useState([])
    useEffect(() => {
        let p = []
        if (props.rootProjects === undefined) return
        for(let i=0; i<props.rootProjects.length; i++) {
            p.push(<TaskMenuComponent key={props.rootProjects[i]._id} {...props.rootProjects[i]}  />)
        }
        setTaskMenuComponents(p)
    }, [props.rootProjects])

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
    <div className="w-full" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className='flex flex-col  ml-4 mr-4 text-gray-800 p-2'>
            <button type="button" className="flex flex-row justify-between hover:text-black font-bold ">
                <div>Projects</div>
                <div>down</div>
            </button>
            {show ?
            <div className="flex flex-col justify-start animate-rollout">
                {taskMenuComponents}
            </div> :
            ""}
        </div>
    </div>
)

}
