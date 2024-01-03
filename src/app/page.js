"use client"
import Image from 'next/image'
import ProjectMenuComponent from './components/ProjectMenuComponent'
import ProjectTemplate from './components/ProjectTemplate'
import handleSubmit from './functions/handleSubmit'
import { useContext, useEffect, useState } from 'react'
import ProjectCreation from './components/ProjectCreation'
import { Fascinate_Inline } from 'next/font/google'
import accountContext from './context/accountContext'
import EmptyProjectCard from './components/EmptyProjectCard';
import TaskCreation from './components/TaskCreation'
import Navbar from './components/Navbar'
import RightSideBar from './components/RightSideBar'
import { DragDropContext } from 'react-beautiful-dnd'

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
        p.push(<ProjectTemplate changeProjects={changeProjects} tasks={projects[i].tasks} name={projects[i].name}  addNewTask={addNewTask} parent={projects[i]._id} />)
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
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
  
    // Do nothing if dropped outside the list
    if (!destination) {
      return;
    }
  
    // Dropped in the same list at the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
  
    // Creating a new copy of projects
    let newProjects = projects.map(project => ({...project, tasks: [...project.tasks]}));
    let task;
  
    // Find and remove the task from the source project
    for (let i = 0; i < newProjects.length; i++) {
      if (newProjects[i]._id === source.droppableId) {
        [task] = newProjects[i].tasks.splice(source.index, 1);
      }
    }
  
    // Insert the task into the destination project
    for (let i = 0; i < newProjects.length; i++) {
      if (newProjects[i]._id === destination.droppableId) {
        newProjects[i].tasks.splice(destination.index, 0, task);
      }
    }
  
    // Update the state
    console.log(newProjects)
    setProjects(JSON.parse(JSON.stringify(newProjects)))
  };
  
    

  return (
    <div className='flex flex-row'>
      <Navbar />
      {creation?
      whichCreation=="task"?<TaskCreation changeProjects={changeProjects} parent={creationName} setCreation={setCreation} setProjects={setProjects}/>
      :<ProjectCreation changeProjects={changeProjects} setProjects={setProjects} setCreation={setCreation} />
      : ""}
      <div onClick={exitSellection} className="bg-secondary flex flex-row"  style={creation ? { opacity: 0.1 } : {}}>
        <div className='w-15vw flex flex-col justify-between bg-secondary'>
          <div>
            <div>Projects</div>
            <ProjectMenuComponent />
            <ProjectMenuComponent />
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

          <div className='flex w-60vw'> 
            <DragDropContext onDragEnd={handleDragEnd}>
              {projectTemplates}
            </DragDropContext>
            </div>
        </div >
        <RightSideBar />
      </div>

    </div>
  )
}
