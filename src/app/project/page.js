"use client"

import { DragDropContext } from "react-beautiful-dnd"
import EmptyProjectCard from "../components/EmptyProjectCard"
import Navbar from "../components/Navbar"
import ProjectCreation from "../components/ProjectCreation"
import ProjectMenuComponent from "../components/ProjectMenuComponent"
import ProjectTemplate from "../components/ProjectTemplate"
import TaskCreation from "../components/TaskCreation"
import RightSideBar from "../components/RightSideBar"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import accountContext from "../context/accountContext"


export default function Home(props) {
  
  const [creation, setCreation] = useState(false)
  const [firstClick, setFirstClick] = useState(false)
  const [creationName, setCreationName] = useState({})
  const [projectTemplates, setProjectTemplates] = useState([])
  const {account} = useContext(accountContext)
  const [projects, setProjects] = useState([])
  const [whichCreation, setWhichCreation] = useState("")
  const [changed, setChanged] = useState(false) 
  const searchParams = useSearchParams()

  useEffect( () => {
    fetch("api/connectToDB")
  }, []
  )

  useEffect( () => {
    console.log("here1");
    let f = async (projectId) => {
        console.log(account)
        const response = await fetch(`/api/getProjects?username=${account.username}&projectId=${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, ${response.json()}`);
      }
      const responseBody = await response.json()
      console.log("projects got form api", responseBody)
      setProjects(responseBody)
  }
  const projectId = searchParams.get("projectId")
  if (projectId) {
      f(projectId)
    
  } else {
    console.log("no params")
  }

  }, [changed])
  
  useEffect( () => {
    let p = []
    console.log("propjects before passing", projects)
    console.log("ads before passing", projects[0])
    let toDo = []
    let inProgress = []
    let completed = []
    if (projects.tasks != undefined) {
        for(let i=0; i<projects.tasks.length; i++) {
            if (projects.tasks[i].place == "toDo") toDo.push(projects.tasks[i])
            if (projects.tasks[i].place == "inProgress") inProgress.push(projects.tasks[i])
            if (projects.tasks[i].place == "completed") completed.push(projects.tasks[i])
        }
    }
    toDo.sort((a, b) => a.index - b.index)
    inProgress.sort((a, b) => a.index - b.index)
    completed.sort((a, b) => a.index - b.index)
    p.push(<ProjectTemplate changeProjects={changeProjects} biggestIndex={toDo.length-1} tasks={toDo} place={"toDo"}  addNewTask={addNewTask} parent={projects._id} />)
    p.push(<ProjectTemplate changeProjects={changeProjects} biggestIndex={inProgress.length-1} tasks={inProgress} place={"inProgress"}  addNewTask={addNewTask} parent={projects._id} />)
    p.push(<ProjectTemplate changeProjects={changeProjects} biggestIndex={completed.length-1} tasks={completed} place={"completed"}  addNewTask={addNewTask} parent={projects._id} />)

    
    setProjectTemplates(p)
    console.log("page projects", p)
  }, [projects])
  
  const changeProjects = () => {
    console.log("projektai end", projects)
    setChanged(i => !i)
  }

  
  const addNewTask = (parentId, place, index) => {
    console.log(parent)
    console.log("pedofilas", {parentId, index, place})
    setCreationName({parentId, index, place})
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
    console.log(result)
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
    let newTasks = JSON.parse(JSON.stringify(projects.tasks))
    for(let i=0; i<newTasks.length; i++) {
        if (newTasks[i].place === source.droppableId && newTasks[i].index === source.index) {
            newTasks[i].place = destination.droppableId
            newTasks[i].index = destination.index
        } 
        else if (source.droppableId === destination.droppableId && newTasks[i].place === source.droppableId &&source.index<destination.index &&  newTasks[i].index >= source.index && newTasks[i].index<=destination.index) {
            console.log("this1")
            newTasks[i].index--
        }
        else if (source.droppableId === destination.droppableId && newTasks[i].place === source.droppableId &&source.index>destination.index &&  newTasks[i].index < source.index && newTasks[i].index>=destination.index) {
            console.log("this2")
            newTasks[i].index++
        }
        else if (source.droppableId !== destination.droppableId && newTasks[i].place === destination.droppableId &&newTasks[i].index>=destination.index) {
            console.log("this3")
            newTasks[i].index++
        }
        else if (source.droppableId !== destination.droppableId && newTasks[i].place === source.droppableId &&newTasks[i].index>source.index) {
            console.log("this3")
            newTasks[i].index--
        }
    }
  
    // Update the state
    console.log({...projects, tasks:newTasks})
    setProjects({...projects, tasks:newTasks})
  };
  
    

  return (
    <div className='flex flex-row'>
      <Navbar />
      {creation?
      whichCreation=="task"?<TaskCreation changeProjects={changeProjects} parentId={creationName.parentId} place={creationName.place} index={creationName.index} setCreation={setCreation} setProjects={setProjects}/>
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
