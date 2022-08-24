import React from "react";
import { ComponentWithResources, TabWidget } from '../../../../genui';
import DrugExPage from './DrugExPage';
import ObjectivePage from './objective/ObjectivePage';
import EnvironmentPage from './environment/EnvironmentPage';

class DrugEx extends React.Component {

  render() {
    if (!this.props.currentProject) {
      return <div>Loading...</div>
    }

    const resources = {
      algorithmChoices : new URL('algorithms/', this.props.apiUrls.generatorsRoot),
      metrics: new URL('metrics/', this.props.apiUrls.generatorsRoot),
      environments: new URL(`environments/?project_id=${this.props.currentProject.id}`, this.props.apiUrls.drugexRoot),
      compoundSets: new URL(`all/?project_id=${this.props.currentProject.id}`, this.props.apiUrls.compoundSetsRoot),
    };

    const tabs = [
      {
        title: "Model Designer",
        renderedComponent: DrugExPage
      },
      {
        title: "Objective Creator",
        renderedComponent: ObjectivePage
      },
      {
        title: "Environment Creator",
        renderedComponent: EnvironmentPage
      }
    ]

    return (
        <ComponentWithResources definition={resources}>
          {
            (allLoaded, resources) => (
                allLoaded ? (
                  <TabWidget
                    {...this.props}
                    {...resources}
                    tabs={tabs}
                  />
                ) : <div>Loading...</div>
            )
          }
        </ComponentWithResources>
    )
  }
}

export default DrugEx;