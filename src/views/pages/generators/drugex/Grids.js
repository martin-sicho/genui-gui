import React from "react";
import {ModelsPage} from "../../../../genui";

class DrugExModelList extends React.Component {

    render() {
        return (
            <React.Fragment>
                <h1>{this.props.title}</h1>
                <hr/>
                <ModelsPage
                    {...this.props}
                    headerComponent={null}
                />
            </React.Fragment>
        )
    }
}

export function DrugeExNetGrid(props) {
    return (
        <div className={props.modelClass} id={props.modelClass}>
            <DrugExModelList
                {...props}
                cardSetup={{
                    h: {"md": 13, "sm": 13},
                    w: {"md": 1, "sm": 1},
                    minH: {"md": 3, "sm": 3},
                }}
            />
        </div>
    )
}

export function DrugExAgentGrid(props) {
    return (
        <div className={props.modelClass} id={props.modelClass}>
            <DrugExModelList
                {...props}
                cardSetup={{
                    h: {"md": 13, "sm": 13},
                    w: {"md": 1, "sm": 1},
                    minH: {"md": 3, "sm": 3},
                }}
            />
        </div>
    )
}