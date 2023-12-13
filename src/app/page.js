"use client"
import Image from 'next/image'
import Project from './components/Project'
import ProjectTemplate from './components/ProjectTemplate'
import handleSubmit from './functions/handleSubmit'
import { useContext, useEffect, useState } from 'react'
import ProjectCreation from './components/ProjectCreation'
import { Fascinate_Inline } from 'next/font/google'
import accountContext from './context/accountContext'
import EmptyProjectCard from './components/EmptyProjectCard';
import TaskCreation from './components/TaskCreation'

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

  useEffect( () => {
    console.log("here1");
    let f = async () => {
        console.log(account)
        const response = await fetch('/api/getProjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: account.username}),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, ${response.json()}`);
      }
      const responseBody = await response.json()
      console.log("projects got form api", responseBody)
      setProjects(responseBody)
  }
  f()

  }, [changed])
  
  useEffect( () => {
    let p = []
    console.log("propjects before passing", projects)
    console.log("ads before passing", projects[0])
    for(let i=0; i<3 && projects.length>i; i++) {
        p.push(<ProjectTemplate changeProjects={changeProjects} tasks={projects[i].tasks}  addNewTask={addNewTask} parent={projects[i]._id} />)
    }
    for(let i=p.length; i<3; i++) {
      p.push(<EmptyProjectCard changeProjects={changeProjects} addNewTask={addNewTask} />)

    }
    setProjectTemplates(p)
    console.log("page projects", p)
  }, [projects])
  
  const changeProjects = () => {
    console.log("projektai end", projects)
    setChanged(i => !i)
  }
  useEffect( () => {
    console.log("projects", projects)
  }, [projects, projectTemplates])
  
  const addNewTask = (parent) => {
    console.log(parent)
    setCreationName(parent)
    setWhichCreation("task")
    setCreation(i => !i)
    setFirstClick(true)

    console.log("antras")
  }
  const addProject = () => {
    setWhichCreation("project")
    setCreation(i => !i)
  }
  const exitSellection = () => {
    if (creation && !firstClick) setCreation(false)
    setFirstClick(i => !i)
    console.log("hi")
    console.log(firstClick)
  }

  return (
    <div className='flex flex-row'>
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
      {creation?
      whichCreation=="task"?<TaskCreation changeProjects={changeProjects} parent={creationName} setCreation={setCreation} setProjects={setProjects}/>
      :<ProjectCreation changeProjects={changeProjects} setProjects={setProjects} setCreation={setCreation} />
      : ""}
      <div onClick={exitSellection} className="flex flex-row"  style={creation ? { opacity: 0.1 } : {}}>
        <div className='w-80 flex flex-col justify-between bg-slate-100'>
          <div>
            <div>Projects</div>
            <Project />
            <Project />
          </div>
          <div>
            <div>
              
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

          <div className='flex'> 
            {projectTemplates}
            </div>
        </div>
      </div>

    </div>
  )
}
