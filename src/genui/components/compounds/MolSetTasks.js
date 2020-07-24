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
            return (
              <React.Fragment>
                <h4>
                  Tasks <TaskBadgeGroup {...taskBadgeProps} />
                </h4>
                <TaskProgressBar
                  progressURL={this.props.progressURL}
                  tasks={taskInfo.tasks.running}
                />
              </React.Fragment>
            )
          }
        }
      />
    )
  }
}

export default MolSetTasks;