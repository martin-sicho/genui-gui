import React from "react";
import { ComponentWithResources } from '../../../../genui';
import DrugExPage from './DrugExPage';

class DrugEx extends React.Component {

  render() {
    if (!this.props.currentProject) {
      return <div>Loading...</div>
    }

    const resources = {
      algorithmChoices : new URL('algorithms/', this.props.apiUrls.generatorsRoot),
      metrics: new URL('metrics/', this.props.apiUrls.generatorsRoot),
      environments: new URL(`models/?project_id=${this.props.currentProject.id}`, this.props.apiUrls.qsarRoot),
      compoundSets: new URL(`all/?project_id=${this.props.currentProject.id}`, this.props.apiUrls.compoundSetsRoot),
    };

    return (
        <ComponentWithResources definition={resources}>
          {
            (allLoaded, resources) => (
                allLoaded ? (
                    <DrugExPage
                        {...this.props}
                        {...resources}
                    />
                ) : <div>Loading...</div>
            )
          }
        </ComponentWithResources>
    )
  }
}

export default DrugEx;