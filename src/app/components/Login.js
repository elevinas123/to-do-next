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
        console.log(props)
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
                <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">Login</button>
            </form>
            <div className="mt-2 font-semibold ">Or</div>
            <button className="w-full mt-2 bg-blue-300 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit" onClick={props.startAccountCreation} >Create account</button>
        </div>
    )
}