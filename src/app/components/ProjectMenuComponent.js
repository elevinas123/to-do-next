import { useEffect, useState, useContext } from "react"
import accountContext from "../context/accountContext"

export default function ProjectMenuComponent(props) {
    const [show, setShow] = useState(false)
    const [hoverTimeout, setHoverTimeout] = useState(null)
    const [taskMenuComponents, setTaskMenuComponents] = useState([])
    const {account} = useContext(accountContext)
    const [childrenProjects, setChildrenProjects] = useState([])
    useEffect( () => {
        let f = async () => {
            console.log("cia yra useEffect", props)
            const response = await fetch(`/api/getProjects?username=${account.username}&projectId=${props._id}&populateSecond=true`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}, ${response.json()}`);
          }
          const responseBody = await response.json()
          console.log("projektas+++", responseBody )
          setChildrenProjects(responseBody.tasks)
      }
      if (!props.isRoot && props._id) {
        f()
      } else {
        setChildrenProjects(props.childrenProjects)
      }
    
      }, [props.childrenProjects])
    useEffect(() => {
        let p = []
        console.log("cia yra ten kur daro", props)
        if (childrenProjects === undefined) return
        for(let i=0; i<childrenProjects.length; i++) {
            p.push(<ProjectMenuComponent level={props.level+1}  key={childrenProjects[i]._id} {...childrenProjects[i]}  />)
        }
        setTaskMenuComponents(p)
    }, [childrenProjects])

    

    

    const handleClick = () => {
        console.log("clickas", childrenProjects)
        console.log("clickas", props)
        console.log("clickas", taskMenuComponents)
        setShow(i=> !i)
    }

    

    // ProjectMenuComponent.js
return (
    <div className="w-full"  >
        <div className='flex flex-col  ml-4 mr-4 text-gray-800 p-2'>
            <button type="button" onClick={handleClick} className="flex flex-row justify-between hover:bg-secondary hover:text-black font-bold ">
                <div>{props.name}</div>
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
