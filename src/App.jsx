import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectSidebar from "./components/ProjectSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import { testFunction, useUsers } from "./hooks/useUsers";

function App() {
   // const { users, getUsers } = useUsers()
   // const { users } = testFunction();
   // console.log(users);

   const [projectsState, setProjectState] = useState({
      selectedProjectId: undefined,
      projects: [],
      tasks: [],
   });

   const handleAddTask = (text) => {
      setProjectState((prevState) => {
         const taskId = Math.random();
         const newTask = {
            text: text,
            projectId: prevState.selectedProjectId,
            id: taskId,
         };

         return {
            ...prevState,
            tasks: [newTask, ...prevState.tasks],
         };
      });
   };
   const handleDeleteTask = (id) => {
      setProjectState((prevState) => {
         return {
            ...prevState,
            tasks: prevState.tasks.filter((task) => task.id !== id),
         };
      });
   };

   const handleSelectproject = (id) => {
      setProjectState((prevState) => {
         return {
            ...prevState,
            selectedProjectId: id,
         };
      });
   };

   const handleStartAddProject = () => {
      setProjectState((prevState) => {
         return {
            ...prevState,
            selectedProjectId: null,
         };
      });
   };

   const handleCancelProject = () => {
      setProjectState((prevState) => {
         return { ...prevState, selectedProjectId: undefined };
      });
   };

   const handleAddProject = (projectData) => {
      setProjectState((prevState) => {
         const projectId = Math.random();
         const newProject = {
            ...projectData,
            id: projectId,
         };

         return {
            ...prevState,
            selectedProjectId: undefined,
            projects: [...prevState.projects, newProject],
         };
      });
   };

   const handleDeleteProject = () => {
      setProjectState((prevState) => {
         return {
            ...prevState,
            selectedProjectId: undefined,
            projects: prevState.projects.filter(
               (project) => project.id !== prevState.selectedProjectId
            ),
         };
      });
   };

   const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
   );

   let content = (
      <SelectedProject
         project={selectedProject}
         onDelete={handleDeleteProject}
         onAddTask={handleAddTask}
         onDeleteTask={handleDeleteTask}
         tasks={projectsState.tasks}
      />
   );

   if (projectsState.selectedProjectId === null) {
      content = (
         <NewProject
            onCancelProject={handleCancelProject}
            onAdd={handleAddProject}
         />
      );
   } else if (projectsState.selectedProjectId === undefined) {
      content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
   }

   return (
      <main className="h-screen my-8 flex gap-8">
         <ProjectSidebar
            onStartAddProject={handleStartAddProject}
            projects={projectsState.projects}
            onSelectProject={handleSelectproject}
            selectedProjectId={projectsState.selectedProjectId}
         />
         {content}
      </main>
   );
}

export default App;
