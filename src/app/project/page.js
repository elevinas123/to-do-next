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
import LeftHandSideProjectMenu from "../components/LeftHandSideProjectMenu"


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
    let f = async (projectId) => {
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
      console.log("projektas", responseBody )
      setProjects(responseBody)
  }
  const projectId = searchParams.get("projectId")
  if (projectId) {
      f(projectId)
    
  } else {
  }

  }, [changed, searchParams.get("projectId")])
  
  useEffect( () => {
    console.log(projects)
    let p = []
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
    
    p.push(<ProjectTemplate key="toDo" changeProjects={changeProjects} biggestIndex={toDo.length-1} tasks={toDo} name={"To do"} place={"toDo"}  addNewTask={addNewTask} parent={projects._id} />)
    p.push(<ProjectTemplate key="inProgress" changeProjects={changeProjects} biggestIndex={inProgress.length-1} name={"In progress"} tasks={inProgress} place={"inProgress"}  addNewTask={addNewTask} parent={projects._id} />)
    p.push(<ProjectTemplate key="completed" changeProjects={changeProjects} biggestIndex={completed.length-1} name={"Completed"} tasks={completed} place={"completed"}  addNewTask={addNewTask} parent={projects._id} />)

    
    setProjectTemplates(p)
  }, [projects])
  
  const changeProjects = () => {
    setChanged(i => !i)
  }

  
  const addNewTask = (parentId, place, index) => {
    setCreationName({parentId, index, place})
    setWhichCreation("task")
    setCreation(i => !i)
    setFirstClick(true)

  }
  const addProject = () => {
    setWhichCreation("project")
    setCreation(i => !i)
  }
  const exitSellection = () => {
    if (creation && !firstClick) setCreation(false)
    setFirstClick(i => !i)
  }
  const handleDragEnd = async (result) => {
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
    let updatedTasks = []
    let updatedProjects = []
    for(let i=0; i<newTasks.length; i++) {
      console.log("hjghjghjghj", newTasks[i])
        if (newTasks[i].place === source.droppableId && newTasks[i].index === source.index) {
            newTasks[i].place = destination.droppableId
            newTasks[i].index = destination.index
            if (newTasks[i].type==="Task") {
              updatedTasks.push(newTasks[i])

            } else {
              updatedProjects.push(newTasks[i])
            }
        } 
        else if (source.droppableId === destination.droppableId && newTasks[i].place === source.droppableId &&source.index<destination.index &&  newTasks[i].index >= source.index && newTasks[i].index<=destination.index) {
            newTasks[i].index--
            if (newTasks[i].type==="Task") {
              updatedTasks.push(newTasks[i])

            } else {
              updatedProjects.push(newTasks[i])
            }
        }
        else if (source.droppableId === destination.droppableId && newTasks[i].place === source.droppableId &&source.index>destination.index &&  newTasks[i].index < source.index && newTasks[i].index>=destination.index) {
            newTasks[i].index++
            if (newTasks[i].type==="Task") {
              updatedTasks.push(newTasks[i])

            } else {
              updatedProjects.push(newTasks[i])
            }

        }
        else if (source.droppableId !== destination.droppableId && newTasks[i].place === destination.droppableId &&newTasks[i].index>=destination.index) {
            newTasks[i].index++
            if (newTasks[i].type==="Task") {
              updatedTasks.push(newTasks[i])

            } else {
              updatedProjects.push(newTasks[i])
            }

        }
        else if (source.droppableId !== destination.droppableId && newTasks[i].place === source.droppableId &&newTasks[i].index>source.index) {
            newTasks[i].index--
            if (newTasks[i].type==="Task") {
              updatedTasks.push(newTasks[i])

            } else {
              updatedProjects.push(newTasks[i])
            }

        }
      
    }
    
    console.log("updatedProjects", updatedProjects)
    console.log("updatedTasks", updatedTasks)
    // Update the state
    setProjects({...projects, tasks:newTasks})
    await fetch(`/api/updateProjects`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProjects),
    });
    await fetch(`/api/createTask`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTasks),
    });
  };
  
    

  return (
    <div className='flex flex-row'>
      <Navbar />
      {creation?
      whichCreation=="task"?<TaskCreation changeProjects={changeProjects} parentId={creationName.parentId} place={creationName.place} index={creationName.index} setCreation={setCreation} setProjects={setProjects}/>
      :<ProjectCreation changeProjects={changeProjects} setProjects={setProjects} setCreation={setCreation} />
      : ""}
      <div onClick={exitSellection} className="bg-secondary flex flex-row"  style={creation ? { opacity: 0.1, backgroundColor: "primary" } : {}}>
        <div className='w-15vw flex flex-col justify-between bg-secondary'>
            <LeftHandSideProjectMenu />
        </div>
        <div >
          <div className="m-2 ml-4">
            
            <div className="flex flex-row font-bold text-4xl  bg-accent text-black justify-center border-2 pt-2 pb-2 pl-2 border-gray-500 border-dashed rounded-lg ">
              {projects.name}
            </div>
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
