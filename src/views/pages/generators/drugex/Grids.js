import React from "react";
import { ComponentWithResources, ModelsPage } from '../../../../genui';

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
            <ComponentWithResources definition={
              {
                netOptions: new URL('networks/', props.apiUrls.drugexRoot),
                agentOptions: new URL('agents/', props.apiUrls.drugexRoot),
              }}
              method="OPTIONS"
            >
              {
                (isLoaded, data) => (
                  isLoaded ? <DrugExModelList
                    {...props}
                    drexnetAlgorithms={data.netOptions.actions.POST.trainingStrategy.children.modelClass.choices}
                    drexnetInputTypes={data.netOptions.actions.POST.trainingStrategy.children.inputType.choices}
                    drexagentExplorers={data.agentOptions.actions.POST.trainingStrategy.children.explorer.choices}
                    cardSetup={{
                      h: {"md": 13, "sm": 13},
                      w: {"md": 1, "sm": 1},
                      minH: {"md": 3, "sm": 3},
                    }}
                  /> : "Fetching network options..."
                )
              }
            </ComponentWithResources>
        </div>
    )
}

export function DrugExAgentGrid(props) {
    return (
        <div className={props.modelClass} id={props.modelClass}>
          <ComponentWithResources definition={
            {
              agentOptions: new URL('agents/', props.apiUrls.drugexRoot),
            }}
            method="OPTIONS"
          >
            {
              (isLoaded, data) => (
                isLoaded ? <DrugExModelList
                  {...props}
                  drexagentExplorers={data.agentOptions.actions.POST.trainingStrategy.children.explorer.choices}
                  cardSetup={{
                    h: {"md": 13, "sm": 13},
                    w: {"md": 1, "sm": 1},
                    minH: {"md": 3, "sm": 3},
                  }}
                /> : "Fetching agent options..."
              )
            }
          </ComponentWithResources>
        </div>
    )
}