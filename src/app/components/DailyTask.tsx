import { IProject } from "../database/schema/ProjectSchema";
import { IRecurrentProject } from "../database/schema/RecurrentProjectShema";
import { ITask } from "../database/schema/TaskSchema";

interface DailyTaskProps extends IRecurrentProject {
    handleTaskClick: (id: string) => Promise<void>;
};

export default function DailyTask(props: DailyTaskProps) {
    return (
        <button
            onClick={() => props.handleTaskClick(props._id)}
            className={`select-none text-md font-medium shadow-sm bg-white border border-gray-300 rounded-md w-15vw h-12 flex justify-center items-center mt-2 transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                props.place === "completed" ? "bg-green-100 border-green-400" : "hover:border-gray-400"
            }`}
        >
            <span className={`cursor-pointer ${props.place === "completed" ? "text-green-500" : "text-gray-800"}`}>
                {props.name}
            </span>
        </button>
    );
}
