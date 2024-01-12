
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import EmptyProjectCard from './EmptyProjectCard';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

export default function ProjectTemplate(props) {
    const [projectCards, setProjectCards] = useState([])
    
    

    useEffect( () => {
        let p = []
        if(props.tasks == undefined) props.tasks = []
        for(let i=0; i<props.tasks.length && i<4; i++) {
            if (props.tasks[i].type==="Project") {
                p.push(<ProjectCard handleEdit={props.handleEdit} handleDelete={props.handleDelete} index={props.index} key={props.tasks[i]._id + "-" + i} {...props.tasks[i]}/>)
            } else {
                p.push(<TaskCard handleEdit={props.handleEdit} handleDelete={props.handleDelete} index={props.index} key={props.tasks[i]._id + "-" + i} {...props.tasks[i]}/>)
            }
        }
        for(let i = props.tasks.length; i<=4; i++) {
            p.push(<EmptyProjectCard key={"empty-" + i} place={props.place} biggestIndex={props.biggestIndex}  addNewTask={props.addNewTask} parent={props.parent} />)
        }
        setProjectCards(p)
        
    }, [props])

    return(
        <div className="w-1/5 border-dashed border-2 bg-accent border-gray-600 h-70vh ml-4 mt-2 rounded-lg flex flex-col">
            <div className="flex flex-row justify-between m-1">
                <div className="text-black m-2 font-bold">{props.name}</div>
                <button onClick={() =>{
                    console.log("visi sitie", props.parent, props.place, props.biggestIndex+1)
                     props.addNewTask(props.parent, props.place, props.biggestIndex+1)
                }} className="flex flex-row m-2">
                    <div   className="text-gray-400 rounded-full bg-gray-200 flex justify-center items-center h-4 w-4 mt-0.5 pb-0.5">
                        <span >+</span>
                    </div>
                    <div  className="ml-1 text-sm font-semibold">Add new task</div>
                    
                </button>
            </div>
            <div className='flex flex-col overflow-hidden '>
            <Droppable droppableId={props.place}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                    {projectCards}
                    {provided.placeholder}
                    </div>
                )}
            </Droppable>
            </div>
        </div>
    )

}