import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTask from './EditTask'
import { useRouter } from 'next/navigation';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

export default function ProjectCard(props) {
    const clickRef = useRef();
    const [completedAmmount, setCompletedAmmount] = useState(0)
    const [clickCount, setClickCount] = useState(0);
    const router = useRouter();
    const [creation, setCreation] = useState(false)
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(props.name)
    useEffect(() => {
        console.log("propsTasks", props)
        let cAmmount = 0
        
        for(let i=0; i<props.tasks.length; i++) {
            if(props.tasks[i].place === "completed") cAmmount++
        }
        setCompletedAmmount(cAmmount)
    }, [props])
      

    const handleClick = () => {
        setClickCount(prev => prev + 1);
    };
    const handleBlur = () => {
        props.handleEdit(props._id, text, "Project")
        setEdit(false)
        setCreation(false)
    }

    const handleEdit = () => {
        setEdit(true)
    }
    useEffect(() => {
        console.log(clickCount)
        if (clickCount === 2) {
        router.push(`/project?projectId=${props._id}`);
        setClickCount(0);
        }

        // Reset click count if not double clicked within a short time
        const timer = setTimeout(() => setClickCount(0), 250);
        return () => clearTimeout(timer);
    }, [clickCount, router, props._id]);


    return (
        props._id &&
        <Draggable draggableId={props._id} index={props.index}>
            {(provided) => (
                <div onClick={handleClick}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                <div ref={clickRef}>
                {!creation?
                <div className="relative ">
                    <EditTask setCreation={setCreation} {...props} />
                    <div   className=" break-words bg-secondary hover:cursor-pointer  border-2  border-black  ml-3 mr-3  mt-2 rounded-lg flex flex-col p-2">
                        <div className="flex flex-row justify-between ml-2 pr-10 mt-3  min-w-0 ">
                            <div className="flex flex-col break-words min-w-0  ">
                            <div  className="flex break-words flex-row ">
                                <div className="min-w-0  font-bold  w-15vw flex-wrap ">{props.name}</div>
                            </div>
                                <div className="text-gray-400 text-sm">{props.description}</div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between mt-3 text-sm ml-2 mr-2 break-words" >
                                <div className="text-gray-400">Progress</div>
                                 
                            </div>
                            <div className="flex flex-row">
                                <progress className={`progress progress-succes w-56 m-2 bg-primary `} value={completedAmmount/props.tasks.length*100} max="100"></progress>
                                <div className="font-semibold">{`${completedAmmount}/${props.tasks.length}`}</div>
                            </div>
                            <div className="flex flex-row justify-between ml-2 mr-2">
                                {props.deadline?
                                <div className="bg-gray-200 text-gray-500 font-semibold rounded-full p-1 pl-2 pr-2 text-sm">{props.deadline}</div>
                                :
                                ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
                    :    
                    <div ref={clickRef}  className="break-words min-w-0 flex flex-row justify-between bg-secondary hover:cursor-pointer h-15vh border-2 border-dashed  border-black  ml-3 mr-3  mt-2 rounded-lg  p-2">
                        <div className="break-words min-w-0 ">
                            {edit?<input type="text" className="h-auto"  onBlur={handleBlur} onChange={(e) => setText(e.target.value)} value={text}/>:props.name}  
                        </div>
                        <div className="flex flex-row m-2">
                            <button onClick={handleEdit} className="  "><MdOutlineEdit  className="w-6 h-6 " /></button>
                            <button onClick={() => props.handleDelete(props._id, props.parent)} className="w-6 h-6 "><IoIosRemoveCircleOutline  color="red" className="  w-6 h-6" /></button>
                        </div>
                    
                    </div>
                    }
                </div>
                </div>
            )}
        </Draggable>
    );
    
}

