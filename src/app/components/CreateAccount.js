import { useState } from "react";




export default function CreateAccount(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleNameChange = (e) => {
        setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let taskObject = {username: username, password: password}
        const response = await fetch('/api/createAccount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskObject),
          });
          console.log(response)
          if (!response.ok) {
            throw new Error(`Error: ${response.status}, ${response.json()}`);
          }
        const responseBody  = await response.json()
        if (responseBody === "Account exists") {
            console.log("Account already exists", responseBody)
        } else {
            console.log("laba diena viskas gerai")
            props.authenticate(responseBody)
            console.log("response from server", responseBody)
        }
          
    };




    return (
        <div className="h-100vh w-15vw z-10 ml-24 absolute flex flex-col items-center justify-center  bg-white rounded-lg shadow-lg p-6 mx-auto">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full mb-4">
                    <input 
                        id="username"
                        value={username}
                        onChange={handleNameChange}
                        className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                        placeholder="Enter username"
                    />
                </div>
                <div className="w-full mb-4">
                    <input 
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={handlePasswordChange}
                        type="text"
                        className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                    />
                </div>
                <div className="w-full mb-4">
                    <input 
                        id="confirmPassword"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        type="text"
                        className="w-full p-2 border rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                    />
                </div>
                <button className="w-full mt-2 bg-blue-300 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit"  >Create account</button>
            </form>
        </div>
    )
}