"use client";
import { useContext } from "react";
import accountContext from "../context/accountContext";

export default function Navbar() {
    const context = useContext(accountContext);

    const logout = () => {
        if (!context) throw new Error("context must not be null");
        const { account } = context;
        localStorage.removeItem("acc");
        account.setLoggedIn(false);
    };

    return (
        <div>
            <div className="w-24 bg-gray-900 h-screen flex flex-col justify-between">
                <div>
                    <div className="text-white p-2 border-gray-600 rounded-full border-4 m-1">Logo</div>
                    <div className="text-white p-2 border-gray-600 rounded-full border-4 m-1">Menu</div>
                    <div className="text-white p-2 border-gray-600 rounded-full border-4 m-1">ACc</div>
                    <div className="text-white p-2 border-gray-600 rounded-full border-4 m-1">Calendar</div>
                    <div className="text-white p-2 border-gray-600 rounded-full border-4 m-1">Summary</div>
                    <div className="text-white p-2 border-gray-600 rounded-full border-4 m-1">Cloud</div>
                    <div className="text-white p-2 border-gray-600 rounded-full border-4 m-1">Map</div>
                </div>
                <button onClick={logout} className="text-white p-2 border-gray-600 rounded-full border-4 m-1">
                    logout
                </button>
            </div>
        </div>
    );
}
