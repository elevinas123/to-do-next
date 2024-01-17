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
import EditMode from './../components/EditMode';


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
  const [editing, setEditing] = useState(false)
  const [editingObject, setEditingObject] = useState({})
  useEffect( () => {
    fetch("api/connectToDB")
  }, []
  )

  useEffect( () => {
    let f = async (projectId) => {
        const response = await fetch(`/api/getProjects?username=${account.username}&projectId=${projectId}&populateSecond=true`, {
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
  
  const handleEdit = async (id, name, text, type) => {
      console.log("here")
      console.log(projects)
        setProjects(project => ({...project, tasks: project.tasks.map(task => 
            task._id === id ? { ...task,name: name, ...(type === "Task" ? { text: text } : { description: text })} : task
        )}));
        const task = await fetch(`/api/${type=="Task"?"recurrentProject/updateReferenceTask":"updateProjectName"}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id,name: name, ...(type === "Task" ? { text: text } : { description: text })})
          });
       console.log(task)
        
    };
    
  const handleDelete = async (id, parentId) => {
        console.log("hi")
        let updatedTasks = [];
        let updatedProjects = [];

        setProjects(project => {
            const taskIndexToDelete = project.tasks.findIndex(task => task._id === id);
            if (taskIndexToDelete === -1) return project; // Task not found, no update needed

            const newTasks = project.tasks
                .map((task, idx) => {
                    if (idx === taskIndexToDelete) return null; // Mark for deletion
                    if (task.index > project.tasks[taskIndexToDelete].index && task.place === project.tasks[taskIndexToDelete].place) {
                        const updatedTask = { ...task, index: task.index - 1 };
                        task.type === "Task" ? updatedTasks.push(updatedTask) : updatedProjects.push(updatedTask);
                        return updatedTask; // Decrement index and add to updated list
                    }
                    return task; // No change
                })
                .filter(task => task !== null); // Remove the marked task

            const newOnModel = [...project.onModel];
            newOnModel.splice(taskIndexToDelete, 1); // Remove from onModel

            return { ...project, tasks: newTasks, onModel: newOnModel };
        });
        await fetch("/api/deleteTaskOrProject", {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, parentId}),
          })


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
   }



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
    
    p.push(<ProjectTemplate setEditing={setEditing} handleEdit={handleEdit}  startEditing={startEditing} handleDelete={handleDelete}  key="toDo" changeProjects={changeProjects} biggestIndex={toDo.length-1} tasks={toDo} name={"To do"} place={"toDo"}  addNewTask={addNewTask} parent={projects._id} />)
    p.push(<ProjectTemplate setEditing={setEditing} handleEdit={handleEdit}  startEditing={startEditing} handleDelete={handleDelete}  key="inProgress" changeProjects={changeProjects} biggestIndex={inProgress.length-1} name={"In progress"} tasks={inProgress} place={"inProgress"}  addNewTask={addNewTask} parent={projects._id} />)
    p.push(<ProjectTemplate setEditing={setEditing} handleEdit={handleEdit}  startEditing={startEditing} handleDelete={handleDelete}  key="completed" changeProjects={changeProjects} biggestIndex={completed.length-1} name={"Completed"} tasks={completed} place={"completed"}  addNewTask={addNewTask} parent={projects._id} />)

    
    setProjectTemplates(p)
  }, [projects])
  
  const changeProjects = () => {
    setChanged(i => !i)
  }

  const startEditing = (object) => {
    setFirstClick(true)
    setEditingObject(object)
    setEditing(true)
  }
  
  const addNewTask = (parentId, place, index) => {
    setCreationName({parentId, index, place})
    setWhichCreation("task")
    setCreation(i => !i)
    setFirstClick(true)

  }
  const exitSellection = () => {
    if ((creation || editing)  && !firstClick) {
      setCreation(false)
      setEditing(false)

    }
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
      : editing?
        <EditMode {...editingObject} />
      
      :""}
      <div onClick={exitSellection} className="bg-secondary flex flex-row"  style={creation ? { opacity: 0.1, backgroundColor: "primary" } : {}}>
        <div className='w-15vw flex flex-col justify-between bg-secondary'>
            <LeftHandSideProjectMenu />
        </div>
        <div >
          <div className="w-60vw flex flex-col  bg-secondary border-b-2 border-accent pb-4  ">
            
          <div className="w-60vw mx-auto bg-secondary border-b-2 border-accent pb-4 ">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-2xl font-extrabold text-black">
                {projects.name}
              </h1>
            </div>
            </div>
            <div className="flex flex-row ">
              <DragDropContext onDragEnd={handleDragEnd}>
                {projectTemplates}
              </DragDropContext>
            </div>
            </div>
        </div >
        <RightSideBar />
      </div>
      
    </div>
  )
}
