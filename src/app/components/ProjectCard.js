import Link from 'next/link'
import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'



export default function ProjectCard(props) {


    
    
    

    const completed = props.subTasks.reduce((count, subTask) => subTask.completed ? count + 1 : count, 0)
    const subTaskLength = props.subTasks.length
    
    return (
        props._id &&
        <Draggable draggableId={props._id} index={props.index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    
                    <div  className=" bg-secondary hover:cursor-pointer h-15vh border-2  border-black  ml-3 mr-3 mt-2 rounded-lg flex flex-col p-2">
                    
                        <div className="flex flex-row justify-between ml-2 mr-2">
                            <div className="flex flex-col">
                                <div className="text-black font-semibold">{props.name}</div>
                                <div className="text-gray-400 text-sm">Dribble marketing</div>
                            </div>
                            <div className="text-black border-gray-200 border-2 rounded-full flex justify-center items-center h-6 w-6  mt-0.5 pb-2">
                                    <span>...</span>
                                </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between mt-3 text-sm ml-2 mr-2" >
                                <div className="text-gray-400">Progress</div>
                                

                            </div>
                            <div className="flex flex-row">
                                <progress className={`progress progress-${completed/subTaskLength*100===0?"error":completed/subTaskLength*100==100?"success":"warning"} w-56 m-2 bg-primary `} value={completed/subTaskLength*100} max="100"></progress>
                                <div className="font-semibold">{`${completed}/${subTaskLength}`}</div>

                            </div>
                            <div className="flex flex-row justify-between ml-2 mr-2">
                                <div className="bg-gray-200 text-gray-500 font-semibold rounded-full p-1 pl-2 pr-2 text-sm">{props.deadline}</div>
                                <div className="flex flex-row text-sm text-gray-500 font-semibold mt-1 ">
                                    <div>c 7</div>
                                    <div>A 2</div>

                                </div>

                            </div>
                        </div>
                    
                    </div>

                </div>
            )}
        </Draggable>
    );
    
}

