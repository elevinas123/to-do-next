import { useState } from "react";




export default function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (e) => {
        setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let taskObject = {username: username}
        const response = await fetch('/api/checkAccount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskObject),
          });
        const responseBody = await response.json()
          if (!response.ok) {
            throw new Error(`Error: ${response.status}, ${response.json()}`);
          }
          if(responseBody[0].password === password) {
            console.log("authenticated");
           props.authenticate(responseBody[0])
          } else {
            console.log("not allowed")
          }
        console.log("response from server", responseBody)
    };




    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-600 block mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            value={username}
                            onChange={handleNameChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition duration-200"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-600 block mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition duration-200"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4 text-sm font-medium text-gray-600">
                    Don't have an account?{" "}
                    <button
                        onClick={props.startAccountCreation}
                        className="text-blue-500 hover:text-blue-600 transition duration-200"
                    >
                        Create one
                    </button>
                </div>
            </div>
        </div>
    );



}