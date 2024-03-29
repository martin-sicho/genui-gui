import React from "react";
import { TaskAwareComponent, TaskBadgeGroup, TaskProgressBar } from '../../index';

class MolSetTasks extends React.Component {

  render() {
    return (
      <TaskAwareComponent
        handleResponseErrors={this.props.handleResponseErrors}
        tasksURL={new URL(`${this.props.molset.id}/tasks/all/`, this.props.apiUrls.compoundSetsRoot)}
        onTaskUpdate={this.props.onTaskUpdate}
        render={
          taskInfo => {
            const taskBadgeProps = {
                tasks: taskInfo.tasks,
                resultComponent : this.props.taskResultComponent,
                errorClassToComponent : this.props.taskErrorClassToComponent,
                errorsGroupFunction: this.props.taskErrorsGroupFunction,
            };
            return taskInfo.tasksExist ? (
              <React.Fragment>
                <span style={{fontSize: "large"}}>Tasks <TaskBadgeGroup {...taskBadgeProps}/></span> <br/>
                <TaskProgressBar
                  progressURL={this.props.progressURL}
                  tasks={taskInfo.tasks.running}
                />
              </React.Fragment>
            ) : null
          }
        }
      />
    )
  }
}

export default MolSetTasks;