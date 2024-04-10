
import EmptyDailyTask from './EmptyDailyTask';
import TaskCreation from './TaskCreation';


type SetupDailyTasksProps = {
    
}   


export default function SetupDailyTasks(props: SetupDailyTasksProps) {
    return (
        <div className="border border-black rounded-lg">
            <EmptyDailyTask handleBlur={props.handleSetup} />
        </div>
    );
}