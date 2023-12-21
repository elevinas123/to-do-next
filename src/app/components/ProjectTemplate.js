
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import EmptyProjectCard from './EmptyProjectCard';

export default function ProjectTemplate(props) {
    console.log("props from the template", props)
    const [projectCards, setProjectCards] = useState([])
    useEffect( () => {
        let p = []
        console.log("props", props)
        if(props.tasks == undefined) props.tasks = []
        for(let i=0; i<props.tasks.length && i<4; i++) {
            p.push(<ProjectCard {...props.tasks[i]}/>)
        }
        for(let i = props.tasks.length; i<4; i++) {
            p.push(<EmptyProjectCard addNewTask={props.addNewTask} parent={props.parent} />)
        }
        setProjectCards(p)
        
        console.log("projectCards", projectCards)
    }, [props])

    return(
        <div className="w-1/5 border-dashed border-2 border-gray-200 h-70vh ml-4 mt-2 rounded-lg flex flex-col">
            <div className="flex flex-row justify-between m-1">
                <div className="text-gray-400 m-2">{props.name}</div>
                <button onClick={() => props.addNewTask(props.parent)} className="flex flex-row m-2">
                    <div   className="text-gray-400 rounded-full bg-gray-200 flex justify-center items-center h-4 w-4 mt-0.5 pb-0.5">
                        <span >+</span>
                    </div>
                    <div  className="ml-1 text-sm font-semibold">Add new task</div>
                    
                </button>
            </div>
            <div className='flex flex-col'>
                {projectCards}
            </div>
        </div>
    )

}