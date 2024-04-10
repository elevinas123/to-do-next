import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditTask from './EditTask'
import { useRouter } from 'next/navigation';
import { IProject } from '../database/schema/ProjectSchema';


interface ProjectCardProps extends IProject {
    startEditing: (object: any) => void;
    // You can add more custom properties here if needed
}

export default function ProjectCard(props: ProjectCardProps) {
    const [completedAmmount, setCompletedAmmount] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        let cAmmount = 0;

        for (let i = 0; i < props.tasks.length; i++) {
            if (props.tasks[i].place === "completed") cAmmount++;
        }
        setCompletedAmmount(cAmmount);
    }, [props]);

    const handleClick = () => {
        setClickCount((prev) => prev + 1);
    };

    useEffect(() => {
        if (clickCount === 2) {
            router.push(`/project?projectId=${props._id}`);
            setClickCount(0);
        }

        // Reset click count if not double clicked within a short time
        const timer = setTimeout(() => setClickCount(0), 250);
        return () => clearTimeout(timer);
    }, [clickCount, router, props._id]);

    const edit = () => {
        props.startEditing(props);
    };
    return (
        props._id && (
            <Draggable draggableId={props._id} index={props.index}>
                {(provided) => (
                    <div
                        onClick={handleClick}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative p-4 m-3 bg-white rounded-lg shadow border border-gray-300 cursor-pointer"
                    >
                        <EditTask edit={edit} />
                        <h3 className="text-lg font-semibold text-gray-800">{props.name}</h3>
                        <p className="text-gray-600 text-sm">{props.description}</p>
                        <div className="mt-2">
                            <label className="text-gray-500 text-xs">Progress</label>
                            <progress
                                className="progress progress-success w-full h-1 bg-gray-300"
                                value={(completedAmmount / props.tasks.length) * 100}
                                max="100"
                            ></progress>
                            <div className="text-xs font-semibold text-gray-800">{`${completedAmmount}/${props.tasks.length}`}</div>
                        </div>
                    </div>
                )}
            </Draggable>
        )
    );
}

