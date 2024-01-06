
import EmptyDailyTask from './EmptyDailyTask';
import TaskCreation from './TaskCreation';





export default function SetupDailyTasks(props) {




    return (
        <div>
            <div>Seems Like you don't have set up daily tasks yet. Click the buttom below to start task TaskCreation</div>
            <EmptyDailyTask handleBlur={props.handleDailyTaskSetup} />

        </div>
    )
}