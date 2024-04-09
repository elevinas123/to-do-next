import { useState } from "react"




type EmptyDailyTask = {

}


export default function EmptyDailyTask(props: EmptyDailyTask) {
    const [creating, setCreating] = useState(false);
    const [text, setText] = useState("");
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setText(e.target.value);
    };
    return (
        <div
            onClick={() => setCreating(true)}
            className="flex justify-center items-center w-full h-12 bg-gray-100 hover:bg-gray-200 rounded-md mt-2 cursor-pointer transition-colors duration-300"
        >
            {creating ? (
                <input
                    type="text"
                    onChange={handleChange}
                    onBlur={() => {
                        props.handleBlur(text);
                        setCreating(false);
                    }}
                    placeholder="Add new task"
                    className="w-full p-2 text-lg font-medium text-gray-700 focus:outline-none"
                    autoFocus
                />
            ) : (
                <span>Add new task</span>
            )}
        </div>
    );
}