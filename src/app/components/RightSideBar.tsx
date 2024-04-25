import { useContext, useEffect, useState } from "react";
import Calendar from "./Calendar";
import { CgOptions } from "react-icons/cg";
import accountContext from "../context/accountContext";
import ProgressBar from "./ProgressBar";

export default function RightSideBar(props) {
    const { account } = useContext(accountContext);
    const [project, setProject] = useState({});

    const logout = () => {
    localStorage.removeItem("acc")
    account.setLoggedIn(false)
  }


    return (
        <div className="pl-2 w-full">
            <div className="flex flex-col border-l-2 w-full h-full border-blue-300 bg-white shadow-md justify-between">
                <div>
                    <div className="bg-white rounded-xl m-4">
                        <Calendar project={project} />
                    </div>
                </div>
                {/* Logout button at the bottom right */}
                <div className="m-4 self-end">
                    <button
                        onClick={logout}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-700 transition duration-150 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );

}