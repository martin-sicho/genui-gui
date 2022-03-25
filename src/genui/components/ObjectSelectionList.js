import React from "react";
import {Row, Col, ListGroupItem, ListGroup, Container, Button} from "reactstrap";
import {Card} from "reactstrap";
import {TaskAwareComponent, TaskBadgeGroup} from "../index";

function TasksOverview(props) {
    const tasksURL = new URL(`${props.item.id}/tasks/all/`, props.tasksUrlRoot);
    return (
        <TaskAwareComponent
            handleResponseErrors={props.handleResponseErrors}
            tasksURL={tasksURL}
            // onTaskUpdate={props.onTaskUpdate}
            render={
                taskInfo => {
                    return taskInfo.tasksExist ? (
                        <React.Fragment>
                            <span style={{fontSize: "large"}}><TaskBadgeGroup tasks={taskInfo.tasks}/></span> <br/>
                            {/*<TaskProgressBar*/}
                            {/*    progressURL={this.props.progressURL}*/}
                            {/*    tasks={taskInfo.tasks.running}*/}
                            {/*/>*/}
                        </React.Fragment>
                    ) : null
                }
            }
        />
    )
}

function ListItem(props) {
    const Component = props.groupDefinitions[props.groupName].listComponent;
    const componentProps = {};
    componentProps[props.objectProp] = props.item;
    componentProps[props.groupNameProp] = props.groupName;
    componentProps[props.urlProp] = props.groupDefinitions[props.groupName].url;

    const [isOpen, setIsOpen] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    return (
        <Container fluid>
            <Row>
                <Col xs="10" lg="11">
                    <ListGroupItem
                        tag="button"
                        active={isOpen}
                        action
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <strong>{props.item.name}</strong> |
                        Tasks <TasksOverview {...props} />
                    </ListGroupItem>
                </Col>
                <Col xs="2" lg="1" className='text-center'>
                  <Button
                    color="danger"
                    disabled={isDeleting}
                    className='w-99'
                    onClick={(e) => {
                      setIsDeleting(true);
                      props.onDelete(props.groupName, props.item);
                    }}
                  >{isDeleting ? "Deleting..." : "Delete"}</Button>
                </Col>
                {/*<Col xs="2" lg="1"></Col>*/}
            </Row>
            {
                isOpen ? (
                    <React.Fragment>
                        <br/>
                        <Card>
                            <Component {...props} {...componentProps}/>
                        </Card>
                    </React.Fragment>
                ) : null
            }
        </Container>
    )
}

function ObjectList(props) {
    const readableName = props.groupDefinitions[props.groupName].name;
    const NewComponent = props.groupDefinitions[props.groupName].emptyComponent;
    const [newForm, setNewForm] = React.useState(props.addNew);

    const componentProps = {};
    componentProps[props.groupNameProp] = props.groupName;
    componentProps[props.urlProp] = props.groupDefinitions[props.groupName].url;

    return (
        <React.Fragment>
          <h2 style={{display: 'inline-block'}}>{readableName}</h2>{' '}
          <Button
            active={newForm || props.addNew}
            outline
            color="primary"
            onClick={(e) => {
              if (!newForm && !props.addNew) {
                props.onNewFormOpen(e, props.groupName);
                setNewForm(true);
              } else {
                props.onNewFormOpen(e, null);
                setNewForm(false);
              }
            }}>
            Create New
          </Button>

          <hr/>
          <div id={`${props.groupName}-group-list`} className="group-list">
            {
              props.addNew ? (
                <div>
                  <Card id={`${props.groupName}-create-card`}>
                    <NewComponent {...props} {...componentProps} handleCreateNew={(className, data) => {
                      props.onNewFormOpen(null, null);
                      setNewForm(false);
                      props.onCreate(className, data);
                    }}/>
                  </Card>
                </div>
              ) : null
            }

            <ListGroup>
              {
                props.objects.map(item => <ListItem {...props} key={item.id} item={item}/>)
              }
            </ListGroup>

            <br/>
          </div>
        </React.Fragment>
    )
}

function ObjectGroupsList(props) {
    const objects = Object.assign({}, props.objects);
    props.ignoreGroups.forEach(item => delete objects[item]);

    if (props.addNew && !objects.hasOwnProperty(props.addNew)) {
      objects[props.addNew] = [];
    }

    return (
        <div id={props.id}>
            {
                Object.keys(objects).map(groupName => {
                  return (
                    <ObjectList
                      {...props}
                      key={groupName}
                      addNew={groupName === props.addNew}
                      groupName={groupName}
                      objects={objects[groupName]}
                      handleOpenItem={props.handleOpenItem}
                    />
                  )
                  }
                )
            }
        </div>
    )
}

export default ObjectGroupsList;