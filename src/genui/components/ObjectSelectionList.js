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
    const item = props.item;
    const Component = props.groupDefinitions[props.groupName].listComponent;
    const componentProps = {};
    componentProps[props.objectProp] = item;
    componentProps[props.groupNameProp] = props.groupName;
    componentProps[props.urlProp] = props.groupDefinitions[props.groupName].url;

    const [isOpen, setIsOpen] = React.useState(false);
    const [inGrid, setInGrid] = React.useState(false);

    return (
        <Container fluid>
            <Row>
                <Col xs="8" lg="10">
                    <ListGroupItem
                        tag="button"
                        active={isOpen}
                        action
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <strong>{item.name}</strong> |
                        Tasks <TasksOverview {...props} />
                    </ListGroupItem>
                </Col>
                <Col xs="4" lg="2">
                    <Button
                        active={inGrid}
                        outline
                        color="primary"
                        block
                        onClick={(e) => {
                            props.handleSendToGrid(e, props.groupName, item, inGrid);
                            setInGrid(!inGrid);
                        }}>
                        To Grid
                    </Button>
                </Col>
                {/*<Col xs="2" lg="1"><Button outline color="danger" block>Delete</Button></Col>*/}
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
    return props.objects.length !== 0 ? (
        <div id={`${props.groupName}-group-list`} className="group-list">
            <h2>{readableName}</h2>

            <ListGroup>
                {
                    props.objects.map(item => <ListItem {...props} key={item.id} item={item}/>)
                }
            </ListGroup>
            <br/>
        </div>
    ) : null
}

function ObjectGroupsList(props) {
    const objects = Object.assign({}, props.objects);
    props.ignoreGroups.forEach(item => delete objects[item]);

    return (
        <div id={props.id}>
            {
                Object.keys(objects).map(groupName => (
                        <ObjectList
                            {...props}
                            key={groupName}
                            groupName={groupName}
                            objects={objects[groupName]}
                            handleOpenItem={props.handleOpenItem}
                        />
                    )
                )
            }
        </div>
    )
}

export default ObjectGroupsList;