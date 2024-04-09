
import EmptyDailyTask from './EmptyDailyTask';
import TaskCreation from './TaskCreation';





export default function SetupDailyTasks(props) {




    return (
        <div className="border border-black rounded-lg">
            <EmptyDailyTask handleBlur={props.handleSetup} />
        </div>
    );
}