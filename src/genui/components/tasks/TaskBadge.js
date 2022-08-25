import {
  Badge,
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledCollapse,
} from 'reactstrap';
import React from 'react';
import TaskResult from "./TaskResult";

function TaskBadge(props) {
  const [open, setOpen] = React.useState(false);
  const toggle = e => {e.preventDefault();setOpen(!open)};

  if (props.tasks.length === 0) return null;

  const color = props.color;
  return (
    <React.Fragment>
      <Badge href="#" color={color} onClick={toggle}>{props.tasks.length} {props.children}</Badge>
      <Modal isOpen={open} toggle={toggle} size="lg" scrollable className="unDraggable">
        <ModalHeader toggle={toggle}>Tasks</ModalHeader>
        <ModalBody>
          {
            props.tasks.map((task, index) => {
              return (
                <div key={task.task_id}>
                  <Button color={color} id={`toggler-${index}`} style={{ marginBottom: '1rem' }}>
                    {task.task_name === '' ? task.task_id : task.task_name}
                  </Button>
                  <UncontrolledCollapse toggler={`#toggler-${index}`}>
                    <Card>
                      <CardBody>
                        <ul>
                          <li>
                            <strong>ID:</strong> {task.task_id}
                          </li>
                          <li>
                            <strong>Status:</strong> {task.status}
                          </li>
                          <li>
                            <strong>Result:</strong>
                            <span>{task.result === null ? 'Unavailable' : <TaskResult {...props} result={task.result}/>}</span>
                          </li>
                          {task.traceback ? (
                            <li>
                              <strong>Traceback:</strong> {task.traceback}
                            </li>
                          ) : null}
                        </ul>
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              )
            })
          }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Close</Button>{' '}
          {/*<Button color="secondary" onClick={toggle}>Cancel</Button>*/}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

export default TaskBadge;