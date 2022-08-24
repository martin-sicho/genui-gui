import React from "react";
import { ComponentWithResources } from '../../../../../genui';
import SimpleChooser from './SimpleChooser';

function PredictorsOverview(props) {
  return (
    <div className="predictors-overview">
      <h1>{props.title}</h1>
      <SimpleChooser
        title={props.title}
        options={props.predictors.map(item => ({id: item.id, value: item.name}))}
        existing={props.data}
        onAdd={props.onAdd}
        onDelete={props.onDelete}
        objectFromOption={option => (
          {
            name: option.value,
            model: option.id,
            project: props.currentProject.id
          }
        )}
        objectToName={option => option.name}
      />
    </div>
  );
}

export default function Predictors(props) {
  const definition = {
    predictors: new URL('models/', props.apiUrls.qsarRoot)
  }
  return (
    <ComponentWithResources definition={definition}>
      {
        (isLoaded, data) => isLoaded ? <PredictorsOverview {...props} predictors={data.predictors}/> : "Fetching predictors..."
      }
    </ComponentWithResources>
  )
}