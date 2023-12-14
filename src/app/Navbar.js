


export default function Navbar() {

    return(
        <div >
            <div className="w-24 bg-gray-900 h-screen flex flex-col justify-between" >
        <div>
          <div className='text-white p-2 border-gray-600 rounded-full border-4 m-1' >Logo</div>
          <div className='text-white p-2 border-gray-600 rounded-full border-4 m-1' >Menu</div>
          <div className='text-white p-2 border-gray-600 rounded-full border-4 m-1' >ACc</div>
          <div className='text-white p-2 border-gray-600 rounded-full border-4 m-1' >Calendar</div>
          <div className='text-white p-2 border-gray-600 rounded-full border-4 m-1' >Summary</div>
          <div className='text-white p-2 border-gray-600 rounded-full border-4 m-1' >Cloud</div>
          <div className='text-white p-2 border-gray-600 rounded-full border-4 m-1' >Map</div>
        </div>
        <div className="text-white p-2 border-gray-600 rounded-full border-4 m-1">
          logout
        </div>
      </div>
        </div>
    )
}