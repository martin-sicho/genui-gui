import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ComponentWithResources } from '../../index';

export default function ProjectManager(props) {
  const [project, setProject] = useState(null)
  const openCallback = props.onProjectOpen;
  const navigate = useNavigate();
  const params = useParams();
  const project_id = project ? project.id : params.project;
  useEffect(() => {
    if (project_id) {
      openCallback({id: project_id});
    }
  }, [openCallback, project_id])

  const openProject = (project, noEffects = false) => {
    setProject(project);
    openCallback(project);
    navigate(`/projects/${project.id}/`);
  }

  const deleteProject = (project, callback) => {
    fetch(new URL(project.id, props.projectListURL), {method: 'DELETE', credentials: "include"}).then((response) => {
      if (response.ok) {
        if (project_id && (project.id.toString() === project_id.toString())) {
          setProject(null);
          openCallback(null);
        }
      } else {
        console.log("Failed to delete project: " + project.id);
      }
    }).then(
      (response) => {
        if (callback) callback(response);
      }
    );
  };

  return project_id ? (
      <ComponentWithResources updateCondition={(prev, now) => prev.project && now.project ? prev.project.id !== now.project.id : false} project={project} definition={{project: new URL(project_id + '/', props.projectListURL)}}>
        {
          (isLoaded, data) => {
            if (isLoaded) {
              return (
                <React.Fragment>
                  {props.render({currentProject: data.project, openProject: openProject, deleteProject: deleteProject})}
                </React.Fragment>
              )
            } else {
              return "Loading project data...";
            }
          }
        }
      </ComponentWithResources>
  ) : (
  <React.Fragment>
    {props.render({currentProject: null, openProject: openProject, deleteProject: deleteProject})}
  </React.Fragment>
  )
}