import React from "react";
import { CardSubtitle } from 'reactstrap';
import {TaskBadgeGroup, TaskProgressBar} from "../index";

function ProjectItemSubTitle(props) {
  const item = props.item;
  const tasks = props.tasks;
  return (
    <React.Fragment>
      <CardSubtitle>
        <p>
          Created: {
          new Date(item.created).toLocaleDateString()
          + ' – ' + new Date(item.created).toLocaleTimeString()
        }
          <br/>
          Last Update: {
          new Date(item.updated).toLocaleDateString()
          + ' – ' + new Date(item.updated).toLocaleTimeString()
        }
        </p>
        {
          props.tasksExist ? (
              <React.Fragment>
                <span style={{fontSize: "large"}}>Tasks <TaskBadgeGroup tasks={tasks}/></span> <br/>
                <TaskProgressBar
                    progressURL={props.apiUrls.celeryProgress}
                    tasks={tasks.running}
                />
                <br/>
              </React.Fragment>
          ) : null
        }
      </CardSubtitle>
    </React.Fragment>
  )
}

export default ProjectItemSubTitle;