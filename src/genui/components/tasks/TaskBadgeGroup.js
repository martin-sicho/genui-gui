import React from 'react';
import TaskBadge from './TaskBadge';

function TaskBadgeGroup(props) {
  const tasks = props.tasks;
  return (
    <React.Fragment>
      <TaskBadge color="primary" {...props} tasks={tasks.running}>Running</TaskBadge> <TaskBadge color="success" {...props} tasks={tasks.completed}>Completed</TaskBadge> <TaskBadge color="danger" {...props} tasks={tasks.errors}>Failed</TaskBadge>
    </React.Fragment>
  )
}

export default TaskBadgeGroup;