import React from "react";
import Properties from './Properties';
import Predictors from './Predictors';
import Modifiers from './Modifiers';
import { ComponentWithObjects, TabWidget } from '../../../../../genui';

export default function ObjectivePage (props) {
  const api_urls = props.apiUrls;
  const prefix_methods = 'scorers/methods';
  const method_info = [
    {
      url: new URL(`${prefix_methods}/properties/`, api_urls.drugexRoot),
      title: "Molecule Properties",
      component: Properties
    },
    {
      url: new URL(`${prefix_methods}/genuimodels/`, api_urls.drugexRoot),
      title: "GenUI Predictors",
      component: Predictors
    }
  ];

  const tabs = [
    {
      title: "Scoring Methods",
      renderedComponent: (props) => (
        <div className="scoring-methods">
          {
            method_info.map(item => (
              <ComponentWithObjects
                {...props}
                commitObjects={true}
                key={item.title}
                objectListURL={item.url}
                emptyClassName={item.title}
                render={(data, x, handleAdd, handleDelete, requestUpdate) => <item.component {...props} {...item} data={data[item.title]} updateData={requestUpdate} onAdd={handleAdd} onDelete={handleDelete}/>}
              />
            ))
          }
        </div>
      )
    },
    {
      title: "Desirability Modifiers",
      renderedComponent: (props) => (
        <div className="scoring-modifiers">
          <Modifiers {...props}/>
        </div>
      )
    }
  ];
  return (
    <TabWidget {...props} tabs={tabs}/>
  )
}