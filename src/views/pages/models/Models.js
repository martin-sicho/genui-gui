import React from "react";
import {
  ComponentWithObjects,
  ComponentWithResources,
  ModelsPage,
} from '../../../genui';
import QSARModelCard from './ModelCard';
import QSARModelCreateCard from './QSARModelCreateCard';
import QSARModelCreateFromFileCard from './QSARModelCreateFromFileCard';

function Models(props) {
  const resources = {
    algorithmChoices : new URL('algorithms/', props.apiUrls.qsarRoot),
    descriptors: new URL('descriptors/', props.apiUrls.qsarRoot),
    metrics: new URL('metrics/', props.apiUrls.qsarRoot)
  };
  const definitions = {
    QSARModel: {
      name: "QSAR Models",
      url: new URL( 'models/', props.apiUrls.qsarRoot),
      newComponents: [
        {
          label: "Add",
          component: QSARModelCreateCard
        },
        {
          label: "Import",
          component: QSARModelCreateFromFileCard
        }
      ],
      listComponent: QSARModelCard,
    }
  }
  const defaultClassName = "MolSet";
  return (
    <ComponentWithResources definition={resources}>
      {
        (allLoaded, resources) => (
          allLoaded ? <ComponentWithObjects
            {...props}
            objectListURL={new URL('all/', props.apiUrls.compoundSetsRoot)}
            emptyClassName={defaultClassName}
            render={
              (
                ...args
              ) => {
                const [compoundSets] = [...args];
                const compoundSetsAvailable = !(Object.keys(compoundSets).length === 1 && compoundSets[defaultClassName].length === 0 && compoundSets.constructor === Object);
                return (compoundSetsAvailable ? <ModelsPage
                  {...props}
                  {...resources}
                  definitions={definitions}
                  compoundSets={compoundSets}
                /> : <div><p>There are currently no compound sets. You need to create one before building a QSAR model.</p></div>)
              }
            }
          /> : <div>Loading...</div>
        )
      }
    </ComponentWithResources>
  );
}

export default Models;