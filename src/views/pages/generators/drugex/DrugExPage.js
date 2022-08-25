import React from "react";
import { DrugExAgentCard, DrugExNetCard } from './ModelCards';
import { DrugExAgentCreateCard, DrugExNetCreateCard, DrugExNetFromFileCard } from './ModelCreateCards';
import { ComponentWithResources, ModelsPage } from '../../../../genui';

// function CreateModelsNav(props) {
//
//   return (
//     <UncontrolledDropdown nav inNavbar>
//       <DropdownToggle nav caret>
//         Create Model
//       </DropdownToggle>
//       <DropdownMenu>
//         <UncontrolledDropdown>
//           <DropdownToggle nav>Train...</DropdownToggle>
//           <DropdownMenu>
//             {
//               Object.keys(props.modelConfig).map((modelClass) => {
//                 const config = props.modelConfig[modelClass];
//
//                 if (!config.trainComponent) {
//                   return null
//                 }
//
//                 return (
//                   <DropdownItem
//                     key={modelClass}
//                     onClick={() => {props.onModelAdd(config.algorithm, config.trainComponent, config.trainCardSetup, modelClass)}}
//                   >
//                     {modelClass}
//                   </DropdownItem>
//                 )
//               })
//             }
//           </DropdownMenu>
//         </UncontrolledDropdown>
//         <UncontrolledDropdown>
//           <DropdownToggle nav>From File...</DropdownToggle>
//           <DropdownMenu>
//             {
//               Object.keys(props.modelConfig).map((modelClass) => {
//                 const config = props.modelConfig[modelClass];
//
//                 if (!config.uploadComponent) {
//                   return null
//                 }
//
//                 return (
//                   <DropdownItem
//                     key={modelClass}
//                     onClick={() => {props.onModelAdd(config.algorithm, config.uploadComponent, config.uploadCardSetup, modelClass)}}
//                   >
//                     {modelClass}
//                   </DropdownItem>
//                 )
//               })
//             }
//           </DropdownMenu>
//         </UncontrolledDropdown>
//       </DropdownMenu>
//     </UncontrolledDropdown>
//   )
// }

class DrugExPage extends React.Component {

  // handleAddNew = (algorithm, newModelComponent, cardSetup, className) => {
  //   this.setState((prevState) => {
  //     prevState.config[algorithm.name] = Object.assign(prevState.config[algorithm.name], {
  //       selectedToAdd : algorithm,
  //       newModelComponent : newModelComponent ? newModelComponent : prevState.newModelComponent,
  //       newCardSetup : cardSetup ? cardSetup : prevState.newCardSetup,
  //     });
  //     return prevState
  //   });
  //
  //   const elmnt = document.getElementById(className);
  //   scrollTo(document.documentElement, elmnt.offsetTop, 300);
  // };

  // componentDidMount() {
  //   this.props.setPageHeader(
  //     <CreateModelsNav
  //       {...this.props}
  //       modelConfig={this.state.config}
  //       onModelAdd={this.handleAddNew}
  //     />
  //   );
  // }

  render() {
    const definitionsNet = {
      DrugExNetwork : {
        name: "DrugEx Networks",
        url: new URL(`networks/`, this.props.apiUrls.drugexRoot),
        listComponent: DrugExNetCard,
        newComponents: [{
          label: "New",
          component: DrugExNetCreateCard
        }, {
          label: "Import",
          component: DrugExNetFromFileCard
        }],
      }
    };
    const definitionsAgent = {
      DrugExAgent: {
        name: "DrugEx Agents",
        url: new URL('agents/', this.props.apiUrls.drugexRoot),
        listComponent: DrugExAgentCard,
        newComponents: [{
          label: "New",
          component: DrugExAgentCreateCard
        }],
      },
    }

    return (
      <React.Fragment>
        <ComponentWithResources definition={
          {
            netOptions: new URL('networks/', this.props.apiUrls.drugexRoot),
            agentOptions: new URL('agents/', this.props.apiUrls.drugexRoot),
          }}
          method="OPTIONS"
        >
          {
            (isLoaded, data) => isLoaded ?
              <ModelsPage
                {...this.props}
                algorithmChoices={[this.props.algorithmChoices.find(algorithm => algorithm.name === "DrugExNetwork")]}
                drexnetAlgorithms={data.netOptions.actions.POST.trainingStrategy.children.modelClass.choices}
                drexnetInputTypes={data.netOptions.actions.POST.trainingStrategy.children.inputType.choices}
                definitions={definitionsNet}
              /> : "Fetching options..."
          }
        </ComponentWithResources>
        <ComponentWithResources definition={
          {
            agentOptions: new URL('agents/', this.props.apiUrls.drugexRoot),
          }}
          method="OPTIONS"
        >
          {
            (isLoaded, data) => isLoaded ?
              <ModelsPage
                {...this.props}
                netsUrl={definitionsNet.DrugExNetwork.url}
                algorithmChoices={[this.props.algorithmChoices.find(algorithm => algorithm.name === "DrugExAgent")]}
                drexagentExplorers={data.agentOptions.actions.POST.trainingStrategy.children.explorer.choices}
                definitions={definitionsAgent}
              /> : "Fetching options..."
          }
        </ComponentWithResources>
      </React.Fragment>

    );
  }
}

export default DrugExPage;