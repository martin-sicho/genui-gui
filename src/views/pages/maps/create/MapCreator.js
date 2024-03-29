import React from 'react';
import { ComponentWithObjects, ComponentWithResources, ModelsPage } from '../../../../genui';
// import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import MapCreateCard from './MapCreateCard';
import MapCard from './MapCard';

// function HeaderNav(props) {
//   return (<UncontrolledDropdown nav inNavbar>
//     <DropdownToggle nav>Create New...</DropdownToggle>
//     <DropdownMenu>
//       {
//         props.addChoices.map(choice =>
//             (<DropdownItem
//                 key={choice.id}
//                 onClick={() => {props.onModelAdd(
//                     choice
//                     , MapCreateCard
//                     , {
//                       h : {"md" : 13, "sm" : 13},
//                       w : {"md" : 1, "sm" : 1},
//                       minH : {"md" : 3, "sm" : 3},
//                     }
//                 )}}
//             >
//               {choice.name}
//             </DropdownItem>)
//         )
//       }
//     </DropdownMenu>
//   </UncontrolledDropdown>)
// }

const MapDisplay = (props) => {
  const resources = {
    algorithmChoices : new URL('algorithms/', props.apiUrls.mapsRoot),
    descriptors: new URL('descriptors/', props.apiUrls.mapsRoot),
  };
  const definitions = {
    Map: {
      name: "Chemical Space Maps",
      url: props.apiUrls.mapsRoot,
      newComponents: [
        {
          label: "Add",
          component: MapCreateCard
        }
      ],
      listComponent: MapCard,
    }
  }
  const defaultClassName = "Map";
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
                /> : <div><p>There are currently no compound sets. You need to create one before you can create a map.</p></div>)
              }
            }
          /> : <div>Loading...</div>
        )
      }
    </ComponentWithResources>
  );
};

export default MapDisplay;
