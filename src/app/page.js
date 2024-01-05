"use client"
import ProjectMenuComponent from './components/ProjectMenuComponent'
import { useContext, useEffect, useState } from 'react'
import ProjectCreation from './components/ProjectCreation'
import accountContext from './context/accountContext'
import TaskCreation from './components/TaskCreation'
import Navbar from './components/Navbar'
import RightSideBar from './components/RightSideBar'
import LeftHandSideProjectMenu from './components/LeftHandSideProjectMenu'

export default function Home(props) {
  
  const [creation, setCreation] = useState(false)
  const [firstClick, setFirstClick] = useState(false)
  const [creationName, setCreationName] = useState("")
  const [projectTemplates, setProjectTemplates] = useState([])
  const {account} = useContext(accountContext)
  const [projects, setProjects] = useState([])
  const [whichCreation, setWhichCreation] = useState("")
  const [changed, setChanged] = useState(false) 
  useEffect( () => {
    fetch("api/connectToDB")
  }, []
  )
  
  

  const addProject = () => {
    setWhichCreation("project")
    setCreation(i => !i)
  }
  const exitSellection = () => {
    if (creation && !firstClick) setCreation(false)
    setFirstClick(i => !i)
    
  }
  
  
    

  return (
    <div className='flex flex-row'>
      <Navbar />
      {creation?
      whichCreation=="task"?<TaskCreation changeProjects={changeProjects} parent={creationName} setCreation={setCreation} setProjects={setProjects}/>
      :<ProjectCreation  setCreation={setCreation} />
      : ""}
      <div onClick={exitSellection} className="bg-secondary flex flex-row"  style={creation ? { opacity: 0.1 } : {}}>
        <div className='w-15vw flex flex-col justify-between bg-secondary'>
            
          <div>
            <div>
              <LeftHandSideProjectMenu />
            </div>
          </div>
        </div>
        <div>
          <div className='h-5vh'>
            Virsus
          </div>
          <div className='h-5vh '>
            Antra sekcija
          </div>
          <button onClick={addProject} className="w-32 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" type="submit">Add Project</button>
        </div >
        <RightSideBar />
      </div>

    </div>
  )
}
