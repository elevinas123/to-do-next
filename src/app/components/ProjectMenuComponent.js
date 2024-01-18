import { useEffect, useState, useContext} from "react"
import accountContext from "../context/accountContext"
import { useRouter } from 'next/navigation';

export default function ProjectMenuComponent(props) {
    const [show, setShow] = useState(false)
    const [hoverTimeout, setHoverTimeout] = useState(null)
    const [taskMenuComponents, setTaskMenuComponents] = useState([])
    const {account} = useContext(accountContext)
    const [childrenProjects, setChildrenProjects] = useState([])
    const [clickCount, setClickCount] = useState(0);
    const router = useRouter();
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
            if (childrenProjects[i].type === "Project") {
                p.push(<ProjectMenuComponent level={props.level+1}  key={childrenProjects[i]._id} {...childrenProjects[i]}  />)

            }
        }
        setTaskMenuComponents(p)
    }, [childrenProjects])

    

    

    const handleClick = () => {
        setClickCount(i=> i+1)
        setShow(i=> !i)

    }
    useEffect(() => {
        console.log(clickCount)
        if (clickCount === 2) {
            router.push(`/project?projectId=${props._id}`);
            setClickCount(0);
            return
        } 

            const timer = setTimeout(() => {
                setClickCount(0)
    
            }, 250);
            return () => clearTimeout(timer);

        // Reset click count if not double clicked within a short time
        
    }, [clickCount, router, props._id]);

    

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
