import NewProject from "./components/NewProject";
import ProjectSidebar from "./components/ProjectSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from './components/SelectedProject'
function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: []
  });
  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const NewTask = {
        text: text,
        projectId: prevState.selectedProject,
        id: taskId
      }
      return {
        ...prevState,
        tasks: [NewTask, ...prevState.tasks]
      }

    })


  }
  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }
  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }
  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }
  function handleCancelAddProject() {

    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined,
      };
    });
  }
  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProject)
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProject)
  let content = 
  <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}

  />
  if (projectsState.selectedProject === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen py-8 flex gap-8">
      <ProjectSidebar
        projects={projectsState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
