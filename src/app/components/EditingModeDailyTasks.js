import { useEffect, useState } from "react"
import EditableDailyTask from "./EditableDailyTask"
import EmptyDailyTask from "./EmptyDailyTask"




export default function EditingModeDailyTasks(props) {

    const [editableTasks, setEditableTasks] = useState([])

    
    useEffect(() => {
        let p = []
        for(let i=0; i<props.tasks.length; i++) {
            p.push(<EditableDailyTask key={i} {...props.tasks[i]} handleEdit={props.handleEdit} handleDelete={props.handleDelete}  />)
        }
        setEditableTasks(p)
    }, [props.tasks])



    return (
        <div className=" border-gray-600 border-dashed border-2 rounded-lg ml-3 pb-1  " style={{ width: '300px' }} >
            <div className="pl-1">
                {editableTasks}
                <EmptyDailyTask handleBlur={props.handleTaskCreate} index={editableTasks.length} />
            </div>
        </div>
    )
}