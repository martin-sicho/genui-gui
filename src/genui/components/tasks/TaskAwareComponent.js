import React from "react";
import withUnmounted from '@ishawnwang/withunmounted'

class TaskAwareComponent extends React.Component {
  abort = new AbortController();
  hasUnmounted = false;


  constructor(props) {
    super(props);

    this.intervalID = null;
    this.actions = [];
    this.state = {
      tasks : {
        completed : [],
        running : [],
        errors : [],
        pending: []
      }
      , tasksRunning : false
      , tasksUpToDate : false
      , tasksExist : false
      , tasksColorMap : {
        running : 'primary',
        pending : 'secondary',
        errors : 'danger',
        completed : 'success',
      }
    }
  }

  groupTasks = (data) => {
    const tasks = data;
    const completed = [];
    const running = [];
    const errors = [];
    const pending = [];
    Object.keys(tasks).forEach(task_name => {
      tasks[task_name].forEach(task => {
        task.task_name = task_name;
        if (task.status === 'SUCCESS') {
          completed.push(task)
        } else if (['STARTED', 'PROGRESS'].includes(task.status)) {
          running.push(task)
        } else if (['FAILURE', 'REVOKED'].includes(task.status)) {
          errors.push(task)
        } else if (['RECEIVED', 'PENDING', 'RETRY'].includes(task.status)) {
          pending.push(task);
        }
      });
    });

    return {
      completed : completed,
      running : running,
      errors : errors,
      pending : pending
    }
  };

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  tasksChanged(newTasks) {
    return !(
        (this.state.tasks.completed.length === newTasks.completed.length)
        && (this.state.tasks.running.length === newTasks.running.length)
        && (this.state.tasks.errors.length === newTasks.errors.length)
        && (this.state.tasks.pending.length === newTasks.pending.length)
    )
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.tasksChanged(nextState.tasks);
  }

  fetchTasks = () => {
    fetch(this.props.tasksURL, {signal : this.abort.signal, credentials: "include",})
      .then(response => this.props.handleResponseErrors(response, 'Failed to fetch task info from backend.', false))
      .then(data => {
        const tasks = this.groupTasks(data);
        if (Object.keys(tasks).length > 0) {
          this.setState({tasksExist: true})
        }
        this.updateTasks(tasks);
        this.intervalID = setTimeout(this.fetchTasks, 5000);
      }).catch(
      (error) => console.log(error)
    )
  };

  updateTasks = (groupedTasks) => {
    if (this.hasUnmounted) {
      return
    }

    if (groupedTasks.running.length > 0) {
      this.setState({
        tasksRunning : true,
        tasksUpToDate : false,
        tasks : groupedTasks
      });
    } else {
      this.setState((prevState) => {
        return {
          tasksRunning : false,
          tasksUpToDate : true,
          tasks : groupedTasks
        }
      });
    }

    if (this.props.onTaskUpdate) {
      this.props.onTaskUpdate(groupedTasks)
    }

    while (this.actions.length !== 0) {
      this.actions.pop()(groupedTasks);
    }
  };

  registerTaskUpdateAction = (action) => {
    this.actions.push(action);
  };

  render() {
    return this.props.render(this.state, this.registerTaskUpdateAction);
  }
}

export default withUnmounted(TaskAwareComponent);