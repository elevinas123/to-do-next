"use client";
import { Draggable } from "react-beautiful-dnd";
import EditTask from "./EditTask";
import { ITask } from "../database/schema/TaskSchema";


interface  TaskCardProps extends ITask{
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    handleEdit: () => void
    startEditing: (result: any) => void
};


export default function TaskCard(props: TaskCardProps) {
    const edit = () => {
        props.startEditing(props);
    };
    return (
        props._id && (
            <Draggable draggableId={props._id} index={props.index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="m-3"
                    >
                        <div className="bg-white hover:bg-gray-50 cursor-pointer border border-gray-300 rounded-lg shadow-sm p-4 flex justify-between items-center">
                            <EditTask
                                edit={edit}
                            />
                            <div className="text-gray-800 font-semibold truncate">{props.text}</div>
                        </div>
                    </div>
                )}
            </Draggable>
        )
    );
}
