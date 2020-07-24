import React from 'react'
import {groupBy} from "../../utils";
import {Badge, ListGroup, ListGroupItem} from "reactstrap";
import key from "weak-key";

function TaskError(props) {
    const errorClass = props.errorClass;
    const errorClassToComponent = props.errorClassToComponent;
    const Component = errorClassToComponent && errorClassToComponent.hasOwnProperty(errorClass) ? errorClassToComponent[errorClass] : null;
    const error = props.error;
    return (
        <ListGroupItem>
            {
                Component ? (
                    <Component {...props} error={error}/>
                ) : (
                    <React.Fragment>
                        {error.messages.current.map(message => <span key={key({dummy: message})}>{message}</span>)}
                    </React.Fragment>
                )
            }
        </ListGroupItem>
    )
}

function TaskErrorList(props) {
    return (
        <ListGroup onClick={e => e.stopPropagation()}>
            {
                props.errors.map(errorItem => <TaskError {...props} key={key(errorItem)} error={errorItem}/>)
            }
        </ListGroup>
    )
}

function TaskErrors(props) {
    const groupFunction = props.errorsGroupFunction ? props.errorsGroupFunction : errors => groupBy(errors.map(error => JSON.parse(error)), 'current');
    let errors = null;
    try {
        errors = groupFunction(props.errors);
    } catch (e) {
        console.log(e);
    }

    const [selectedGroup, setSelectedGroup] = React.useState(null);

    return errors ? (
        <ListGroup>
            {
                errors.map(error => (
                    <React.Fragment key={error[0].current}>
                        <ListGroupItem tag="button" action onClick={() => error[0].current !== selectedGroup ? setSelectedGroup(error[0].current) : setSelectedGroup(null)}>
                            <strong>{error[0].current}</strong> <Badge pill>{error.length}</Badge>
                        </ListGroupItem>
                        {
                            selectedGroup === error[0].current ? (
                                <TaskErrorList {...props} errorClass={selectedGroup} errors={error}/>
                            ) : null
                        }
                    </React.Fragment>
                ))
            }
        </ListGroup>
    ) : (
        <ul>
            {props.errors.map(error => <li key={key({dummy: error})}>{error.toString()}</li>)}
        </ul>
    )
}

export default function TaskResult(props) {
    const result = JSON.parse(props.result);
    const [showErrors, setShowErrors] = React.useState(false);

    return props.resultComponent ? (
        <props.taskResultComponent {...props} result={result} />
    ) : (
        <ul>
            {Object.keys(result).map(key => {
                if (key === 'errors') {
                    return (
                        <li key={key}>
                            <strong>{key}</strong>: {result[key].length} {result[key].length > 0 ? (<a href="#x" onClick={e => {e.preventDefault(); setShowErrors(!showErrors)}}>show</a>) : null}
                            {showErrors ? <TaskErrors {...props} errors={result.errors}/> : null}
                        </li>);
                }
                return <li key={key}><strong>{key}</strong>: {result[key].toString()}</li>
            })}
        </ul>
    )
}