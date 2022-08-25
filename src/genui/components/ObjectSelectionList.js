import React from "react";
import {Row, Col, ListGroupItem, ListGroup, Container, Button} from "reactstrap";
import {Card} from "reactstrap";
import { scrollTo, TaskAwareComponent, TaskBadgeGroup } from '../index';

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
                          Tasks<span style={{fontSize: "large"}}><TaskBadgeGroup tasks={taskInfo.tasks}/></span> <br/>
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
                        <TasksOverview {...props} />
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
                          <TaskAwareComponent
                            handleResponseErrors={props.handleResponseErrors}
                            tasksURL={new URL(`${props.item.id}/tasks/all/`, props.tasksUrlRoot)}
                            // onTaskUpdate={props.onTaskUpdate}
                            render={
                              taskInfo => {
                                return (
                                  <Component {...props} {...componentProps} taskInfo={taskInfo} tasks={taskInfo.tasks}/>
                                )
                              }
                            }
                          />
                        </Card>
                    </React.Fragment>
                ) : null
            }
        </Container>
    )
}

function ObjectList(props) {
    const name = props.groupDefinitions[props.groupName].name;
    const new_components = props.groupDefinitions[props.groupName].newComponents;
    const [activeNew, setActiveNew] = React.useState(null);

    const componentProps = {};
    componentProps[props.groupNameProp] = props.groupName;
    componentProps[props.urlProp] = props.groupDefinitions[props.groupName].url;
    componentProps[props.createProp] = (className, data) => {
      props.onCreate(className, data);
      setActiveNew(null);
    };
    componentProps[props.deleteProp] = props.onDelete;
    componentProps[props.updateProp] = props.onUpdate;

    // React.useEffect(() => {
    //   if (props.focusGroup) {
    //     const elmnt = document.getElementById(props.focusGroup);
    //     scrollTo(document.documentElement, elmnt.offsetTop, 300);
    //     elmnt.scrollIntoView();
    //   }
    // }, [props.focusGroup])

    return (
        <React.Fragment>
          <h2 style={{display: 'inline-block'}}>{name}</h2> |
          {
            new_components.map(item => (
              <Button
                style={{display: 'inline-block', marginLeft: "0.25rem",marginRight: "0.25rem"}}
                key={item.label}
                active={activeNew && (item.label === activeNew.label)}
                outline
                color="primary"
                onClick={(e) => {
                  if (!activeNew || !(item.label === activeNew.label)) {
                    setActiveNew(item);
                  } else {
                    setActiveNew(null);
                  }
                }}>
                {item.label}
              </Button>
            ))
          }
          <hr/>
          <div id={`${props.groupName}-group-list`} className="group-list">
            {
              activeNew ? (
                <div>
                  <Card id={`${props.groupName}-create-card`} style={{
                    minHeight: '30rem'
                  }}>
                    <activeNew.component {...props} {...componentProps} />
                  </Card>
                </div>
              ) : null
            }

            <ListGroup>
              {
                props.objects.map(item => <ListItem {...props} {...componentProps} key={item.id} item={item}/>)
              }
            </ListGroup>

            <br/>
          </div>
        </React.Fragment>
    )
}

function ObjectGroupsList(props) {
    const objects = Object.assign({}, props.objects);
    if (props.ignoreGroups) {
      props.ignoreGroups.forEach(item => delete objects[item]);
    }

    let scrollToFocus = null;
    if (props.focusGroup && !objects.hasOwnProperty(props.focusGroup)) {
      objects[props.focusGroup] = [];
      scrollToFocus = `${props.focusGroup}-group-list`;
    } else {
      scrollToFocus = false;
    }

    return (
        <div id={props.id}>
            {
                Object.keys(objects).map(groupName => {
                  return (
                    <ObjectList
                      {...props}
                      scrollToFocus={scrollToFocus}
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