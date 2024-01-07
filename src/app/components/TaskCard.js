import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'




export default function TaskCard (props) {
  return (
        props._id &&
        <Draggable draggableId={props._id} index={props.index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    
                    <div  className=" flex flex-col bg-secondary hover:cursor-pointer h-15vh border-2  border-black  ml-3 mr-3  mt-2 rounded-lg  p-2">
                        <div className="  m-2 mt-1 font-bold">{props.text}</div>
                    </div>
                </div>
            )}
        </Draggable>
    );
    
}

