import { useContext, useEffect, useState } from "react";
import ProjectMenuComponent from "./ProjectMenuComponent";
import accountContext from "../context/accountContext";





export default function LeftHandSideProjectMenu(props) {
    const [rootProjects, setRootProjects] = useState([])
    const {account} = useContext(accountContext)
    
    useEffect( () => {
        const f = async () => {
            const response = await fetch(`/api/getAllProjectsByUsername?account=${account.username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}, ${response.json()}`);
          }
          const responseBody = await response.json()
          setRootProjects(responseBody)
        } 
        f()
      
      }, [])

    return(
        <div className="border-r-1 h-100vh border-black shadow-lg z-10">
            <div className="font-semibold ml-6 mt-2 border-2 border-dashed border-black w-fit pl-2 pr-2">Your projects</div>
            <div className="bg-accent rounded-lg mr-2 ml-2 mt-2">
              <ProjectMenuComponent name="projects" rootProjects={rootProjects}/>
              <ProjectMenuComponent name="dailyTasks" rootProjects={[]} />
            </div>
        </div>
    )

}
