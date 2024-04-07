import { useState } from "react";

export default function CreateAccount(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accountExist, setAccountExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        setLoading(true);
        let taskObject = { username: username, password: password };
        const response = await fetch("/api/createAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObject),
        });
        setLoading(false);
        if (!response.ok) {
            setError(`Error: ${response.status}`);
            return;
        }
        const responseBody = await response.json();
        if (responseBody === "Account exists") {
            setAccountExists(true);
            setError("Username already exists");
        } else {
            props.authenticate(responseBody);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-600 block mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            value={username}
                            onChange={handleNameChange}
                            className={`w-full p-3 border ${
                                accountExist ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition duration-200`}
                            placeholder="Enter your username"
                        />
                        {accountExist && <p className="text-red-500 text-xs italic">Username already exists.</p>}
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
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600 block mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition duration-200"
                            placeholder="Confirm your password"
                        />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
}
