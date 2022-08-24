import React from 'react';
import { ComponentWithResources } from '../../../../../genui';
import SimpleChooser from './SimpleChooser';

function PropertyChooser(props) {

  return (
    <React.Fragment>
      <h1>{props.title}</h1>
      <SimpleChooser
        title={props.title}
        options={props.options}
        existing={props.existing}
        onAdd={props.onAdd}
        onDelete={props.onDelete}
        objectFromOption={option => (
          {
            prop: option.value,
            name: option.display_name,
            project: props.project.id
          }
        )}
        objectToName={option => option.prop}
      />
    </React.Fragment>
  );
}

export default function Properties(props) {
  return (
    <div className="properties">
      <ComponentWithResources {...props} definition={{'options' : props.url}} method={"OPTIONS"}>
        {
          (isLoaded, data) => {
            if (isLoaded) {
              const options = data.options.actions.POST.prop.choices;
              return <PropertyChooser
                title={props.title}
                options={options}
                existing={props.data}
                project={props.currentProject}
                onAdd={props.onAdd}
                onDelete={props.onDelete}
              />
            } else {
              return <div>Loading options...</div>
            }
          }
        }
      </ComponentWithResources>
    </div>
  )
}