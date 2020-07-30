import React from "react"
import {ModelCard, ModelInfoTab, ModelPerformance} from '../../../../genui';
import {DrugExAgentPerformanceTab, DrugExNetworkPerformanceTab} from "./tabs/Performance";

export class DrugExNetCard extends React.Component {

  render() {
    const model =  this.props.model;
    // const trainingStrategy = model.trainingStrategy;
    const validationStrategy = model.validationStrategy;

    const trainingParams = [
      {
        name : "Training Set",
        value : model.molset ? model.molset.name : "--"
      },
      {
        name : "Parent",
        value : model.parent ? model.parent.name : "--"
      },
    ];

    const validationParams = validationStrategy ? [
      {
        name : "Validation Set Size",
        value : validationStrategy.validSetSize
      }
    ] : [];

    const tabs = [
      {
        title : "Info",
        renderedComponent : ModelInfoTab
      },
      {
        title: "Performance"
        , renderedComponent : (props) =>
          <ModelPerformance
              {...props}
              component={DrugExNetworkPerformanceTab}
          />
      }
    ];

    return <ModelCard {...this.props} tabs={tabs} extraTrainingParams={trainingParams} extraValidationParams={validationParams}/>
  }
}

export class DrugExAgentCard extends React.Component {

  render() {
    const model =  this.props.model;

    const trainingParams = [
      {
        name : "Environment",
        value : model.environment.name
      },
      {
        name : "Exploitation Network",
        value : model.exploitationNet.name
      },
      {
        name : "Exploration Network",
        value : model.explorationNet.name
      },
    ];

    const tabs = [
      {
        title : "Info",
        renderedComponent : ModelInfoTab
      },
      {
        title: "Performance"
        , renderedComponent : (props) =>
          <ModelPerformance
            {...props}
            component={DrugExAgentPerformanceTab}
          />
      }
    ];

    return <ModelCard {...this.props} tabs={tabs} extraTrainingParams={trainingParams}/>
  }
}