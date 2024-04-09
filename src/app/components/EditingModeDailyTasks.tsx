import { useEffect, useState } from "react"
import EditableDailyTask from "./EditableDailyTask"
import EmptyDailyTask from "./EmptyDailyTask"


type EditingModeDailyTasksProps = {
    
}

export default function EditingModeDailyTasks(props: EditingModeDailyTasksProps) {
    const [editableTasks, setEditableTasks] = useState([]);

    useEffect(() => {
        let p = [];
        console.log("props tasks", props.tasks);
        for (let i = 0; i < props.tasks.length; i++) {
            p.push(
                <EditableDailyTask
                    key={i}
                    {...props.tasks[i]}
                    handleEdit={props.handleEdit}
                    handleDelete={props.handleDelete}
                />
            );
        }
        setEditableTasks(p);
    }, [props.tasks]);

    useEffect(() => {
        console.log("editabeTask", editableTasks);
    }, [editableTasks]);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            {editableTasks}
            <EmptyDailyTask handleBlur={props.handleTaskCreate} index={editableTasks.length} />
        </div>
    );
}