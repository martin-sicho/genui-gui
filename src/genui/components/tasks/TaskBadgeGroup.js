import React from 'react';
import TaskBadge from './TaskBadge';

function TaskBadgeGroup(props) {
  const tasks = props.tasks;
  return (
    <React.Fragment>
        <TaskBadge color="secondary" tasks={tasks.pending}>Pending</TaskBadge> <TaskBadge color="primary" tasks={tasks.running}>Running</TaskBadge> <TaskBadge color="success" tasks={tasks.completed}>Completed</TaskBadge> <TaskBadge color="danger" tasks={tasks.errors}>Failed</TaskBadge>
    </React.Fragment>
  )
}

export default TaskBadgeGroup;