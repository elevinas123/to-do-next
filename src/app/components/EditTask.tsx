import React from "react";

type EditTaskProps = {

}

export default function EditTask(props: EditTaskProps) {
    return (
        <button
            onClick={props.edit}
            className="text-black bg-transparent hover:bg-gray-200 rounded-full p-2 absolute top-4 right-4 flex items-center justify-center hover:scale-110 transition-all duration-300"
        >
            <span>...</span>
        </button>
    );
}
