import Navbar from "../components/Navbar";
import Task from "../components/Task";


export default function Text() {


    return(
        <div className="flex flex-row bg-slate-400">
            <Navbar />
            <div className="w-full flex flex-row justify-between">
                <div className="bg-red-500 h-100vh w-0.5 ml-32"></div>
                <Task />
                <div className="bg-red-500 h-100vh w-0.5 mr-64"></div>
            </div>

        </div>
    )
}