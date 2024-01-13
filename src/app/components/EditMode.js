import { useContext, useEffect, useState } from "react";
import accountContext from './../context/accountContext';





export default function EditMode (props) {
    console.log(props)
    const [name, setName] = useState(props.name);
    const [text, setText] = useState(props.type=="Task"?props.text:props.description)
    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleEdit(props._id, name, text, props.type)
        props.setEditing(false)
    }
    const handleDeleteStart = (e) => {
        e.preventDefault()
        document.getElementById('my_modal_1').showModal()
    }
    const handleDeletion = (e) => {
        e.preventDefault()
        props.handleDelete(props._id, props.parent)
        props.setEditing(false)
    }

    return(
        <form  className="h-100vh w-15vw z-10 ml-24 absolute flex flex-col items-center justify-center  bg-secondary rounded-lg shadow-lg p-6 mx-auto">
            <input onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder="Type here" className="input input-bordered w-full max-w-xs bg-accent" />
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">decription</span>
                </div>
                <textarea onChange={(e) => setText(e.target.value)} className="textarea textarea-bordered h-24 bg-accent" placeholder="description" value={text}></textarea>
                
            </label>
            <button className="w-full border-2 border-black mt-4 rounded-md bg-accent" onClick={handleSubmit} >Submit</button>
            <div className="divider">OR</div>
            <button className="w-full border-2 border-black  rounded-md bg-error" onClick={handleDeleteStart} >{`Delete ${props.type}`} </button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-secondary">
                    <h3 className="font-bold text-lg text-red-500">{`${props.type} deletion!`}</h3>
                    <p className="mt-2">
                        {`You are about to delete a ${props.type} named `}
                        <span className="font-bold underline">{props.name}</span>
                    </p>

                    <p className="font-bold mt-2">{`Are you sure you want to proceed?`}</p>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-info mr-2" >No</button>
                        <button className="btn btn-error mr-2" onClick={handleDeletion} >Yes</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </form> 
    );
}