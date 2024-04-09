




export default function EmptyProjectCard(props) {



    return (
    <button onClick={() => props.addNewTask(props.parent, props.place, props.biggestIndex+1)} className="h-15vh w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4 m-3 bg-gray-50 hover:bg-gray-100">
        <div className="text-gray-700 font-semibold">Add task</div>
    </button>
);

}