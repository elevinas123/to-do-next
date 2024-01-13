import React from "react";

export default function EditTask(props) {

    

    return (
        <button onClick={props.edit} className="text-black border-black-200 border-2 rounded-full absolute top-4 right-4 flex justify-center items-center hover:scale-125 h-6 w-6 mr-2  mt-0.5 pb-2">
            <span>...</span>
        </button>
        );
    }
  
  