




export default function EmptyProjectCard(props) {



    return(
        <button onClick={() => props.addNewTask(props.parent)} className="h-15vh border-2  border-gray-200  ml-3 mr-3 mt-2 rounded-lg flex flex-col p-2 justify-center">
            <div className="flex flex-row justify-center text-gray-400 font-semibold" >Add project</div>
        </button>
    )
}