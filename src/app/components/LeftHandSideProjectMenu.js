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
        <div>
            <div>Projects</div>
            <ProjectMenuComponent name="projects" rootProjects={rootProjects}/>
            <ProjectMenuComponent name="dailyTasks" rootProjects={[]} />
        </div>
    )

}
