




export default function EmptyProjectCard(props) {



    return(
        <button onClick={() => props.addNewTask(props.parent, props.place, props.biggestIndex+1)} className="h-15vh border-2  border-black  ml-3 mr-3 mt-2 rounded-lg flex flex-col p-2 justify-center">
            <div className="flex flex-row justify-center text-gray-black font-semibold" >Add task</div>
        </button>
    )
}