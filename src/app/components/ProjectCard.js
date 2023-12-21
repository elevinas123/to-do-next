import Link from 'next/link'



export default function ProjectCard(props) {


    const handleClick = () => {
        console.log(props)
    }


    return(
        <div onClick={handleClick} className="hover:cursor-pointer h-15vh border-2  border-gray-200  ml-3 mr-3 mt-2 rounded-lg flex flex-col p-2">
            <Link href={`/text?id=${props._id}`}>
            <div className="flex flex-row justify-between ml-2 mr-2">
                <div className="flex flex-col">
                    <div className="text-black font-semibold">{props.name}</div>
                    <div className="text-gray-400 text-sm">Dribble marketing</div>
                </div>
                <div className="text-black border-gray-200 border-2 rounded-full flex justify-center items-center h-6 w-6  mt-0.5 pb-2">
                        <span>...</span>
                    </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between mt-3 text-sm ml-2 mr-2" >
                    <div className="text-gray-400">Progress</div>
                    <div className="font-semibold">7/10</div>

                </div>
                <div className="border-orange-500 border-2 rounded-full mt-2 mb-2 mr-2 ml-2"></div>
                <div className="flex flex-row justify-between ml-2 mr-2">
                    <div className="bg-gray-200 text-gray-500 font-semibold rounded-full p-1 pl-2 pr-2 text-sm">{props.deadline}</div>
                    <div className="flex flex-row text-sm text-gray-500 font-semibold mt-1 ">
                        <div>c 7</div>
                        <div>A 2</div>

                    </div>

                </div>
            </div>
            
            
            </Link>
        </div>
    )
}