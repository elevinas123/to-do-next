import { SetStateAction, useState } from "react";
import { IProject, ItemId, ParentId } from "../database/schema/ProjectSchema";
import { ITask } from "../database/schema/TaskSchema";

export type EditingObject = (ITask | IProject) & {
    handleEdit: (id: ItemId, name: string, text: string, type: "Task" | "Project") => Promise<void>;
    handleDelete: (id: ItemId, parentId: ParentId) => Promise<void>;
    setEditing: React.Dispatch<SetStateAction<boolean>>;
};
export function isTask(item: IProject | ITask): item is ITask {
    return item.type === "Task";
}
type EditModeProps = {
    editingObject: EditingObject | null;
};

export default function EditMode(props: EditModeProps) {
    console.log(props);
    const [name, setName] = useState(props.editingObject?.name ?? "");
    const [text, setText] = useState(
        props.editingObject
            ? isTask(props.editingObject)
                ? props.editingObject.text
                : (props.editingObject && props.editingObject.description) ?? ""
            : ""
    );

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (!props.editingObject) throw new Error("Editing object cant be null");
        props.editingObject.handleEdit(props.editingObject._id, name, text, props.editingObject.type);
        props.editingObject.setEditing(false);
    };
    const handleDeleteStart: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const modal = document.getElementById("my_modal_1") as HTMLDialogElement | null; // Explicit type assertion
        if (!modal) return;
        modal.showModal(); // Now TypeScript knows modal is HTMLDialogElement
    };
    const handleDeletion: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (!props.editingObject) throw new Error("Editing object cant be null");
        props.editingObject.handleDelete(props.editingObject._id, props.editingObject.parent);
        props.editingObject.setEditing(false);
    };
    if (!props.editingObject) throw new Error("Editing object cant be null");
    return (
        <form className="z-20 h-100vh w-15vw  ml-24 absolute flex flex-col items-center justify-center  bg-secondary rounded-lg shadow-lg p-6 mx-auto">
            <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs bg-accent"
            />
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">decription</span>
                </div>
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    className="textarea textarea-bordered h-24 bg-accent"
                    placeholder="description"
                    value={text}
                ></textarea>
            </label>
            <button className="w-full border-2 border-black mt-4 rounded-md bg-accent" onClick={handleSubmit}>
                Submit
            </button>
            <div className="divider">OR</div>
            <button className="w-full border-2 border-black  rounded-md bg-error" onClick={handleDeleteStart}>
                {`Delete ${props.editingObject.type}`}{" "}
            </button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-secondary">
                    <h3 className="font-bold text-lg text-red-500">{`${props.editingObject.type} deletion!`}</h3>
                    <p className="mt-2">
                        {`You are about to delete a ${props.editingObject.type} named `}
                        <span className="font-bold underline">{props.editingObject.name}</span>
                    </p>

                    <p className="font-bold mt-2">{`Are you sure you want to proceed?`}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-info mr-2">No</button>
                            <button className="btn btn-error mr-2" onClick={handleDeletion}>
                                Yes
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </form>
    );
}
