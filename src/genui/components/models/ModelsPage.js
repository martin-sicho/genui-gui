import React from 'react';
import { ComponentWithObjects } from '../../index';
// import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
// import QSARModelCreateCard from '../../../views/pages/models/QSARModelCreateCard';
// import QSARModelCreateFromFileCard from '../../../views/pages/models/QSARModelCreateFromFileCard';
import ObjectGroupsList from '../ObjectSelectionList';

// function HeaderNav(props) {
//   return (<UncontrolledDropdown nav inNavbar>
//     <DropdownToggle nav caret>
//       Create New
//     </DropdownToggle>
//     <DropdownMenu>
//       <UncontrolledDropdown>
//         <DropdownToggle nav>Train Model...</DropdownToggle>
//         <DropdownMenu>
//           {
//             props.addChoices.map(choice =>
//               (<DropdownItem
//                 key={choice.id}
//                 onClick={() => {props.onModelAdd(choice, QSARModelCreateCard, {
//                   h : {"md" : 10, "sm" : 7},
//                   w : {"md" : 1, "sm" : 1},
//                   minH : {"md" : 3, "sm" : 3},
//                 })}}
//               >
//                 {choice.name}
//               </DropdownItem>)
//             )
//           }
//         </DropdownMenu>
//       </UncontrolledDropdown>
//       <UncontrolledDropdown>
//         <DropdownToggle nav>Import Model...</DropdownToggle>
//         <DropdownMenu>
//           {
//             props.addChoices.map(choice =>
//               (<DropdownItem
//                 key={choice.id}
//                 onClick={() => {props.onModelAdd(choice, QSARModelCreateFromFileCard, {
//                   h : {"md" : 8, "sm" : 8},
//                   w : {"md" : 1, "sm" : 1},
//                   minH : {"md" : 3, "sm" : 3},
//                 })}}
//               >
//                 {choice.name}
//               </DropdownItem>)
//             )
//           }
//         </DropdownMenu>
//       </UncontrolledDropdown>
//     </DropdownMenu>
//   </UncontrolledDropdown>)
// }

class ModelsPage extends React.Component {

  constructor(props) {
    super(props);

    this.headerComponent = this.props.headerComponent;

    this.state = {
      selectedToAdd : this.props.selectedToAdd,
      newModelComponent : this.props.newModelComponent,
      newCardSetup : this.props.newCardSetup ? this.props.newCardSetup : { // TODO: it would be wiser to store all properties that will be passed to the card component rather than just this
        h : {"md" : 15, "sm" : 15},
        w : {"md" : 1, "sm" : 1},
        minH : {"md" : 3, "sm" : 3},
      },
      cardSetup : this.props.cardSetup ? this.props.cardSetup : { // TODO: it would be wiser to store all properties that will be passed to the card component rather than just this
        h : {"md" : 12, "sm" : 12},
        w : {"md" : 1, "sm" : 1},
        minH : {"md" : 3, "sm" : 3},
      }
    }
  }

  handleAddNew = (model, newModelComponent, cardSetup) => {
    this.setState((prevState) => {
      return {
        selectedToAdd : model,
        newModelComponent : newModelComponent ? newModelComponent : prevState.newModelComponent,
        newCardSetup : cardSetup ? cardSetup : prevState.newCardSetup,
      }
    })
  };

  // componentDidMount() {
  //   this.props.setPageHeader(<HeaderNav {...this.props} addChoices={this.props.algorithmChoices} onModelAdd={this.handleAddNew}/>);
  // }

  render() {
    const modelClass = Object.keys(this.props.definitions)[0];
    return (
      <div className="models-page">
        <ComponentWithObjects
          {...this.props}
          emptyClassName={modelClass}
          objectListURL={this.props.definitions[modelClass].url}
          render={
            (models, handleAddModelList, handleAddModel, handleModelDelete, handleModelUpdate) => {
              return <ObjectGroupsList
                {...this.props}
                chosenAlgorithm={this.props.algorithmChoices.length === 1 ? this.props.algorithmChoices[0] : null}
                models={models[modelClass]}
                id="models-list"
                objects={models}
                objectProp="model"
                groupNameProp="modelClass"
                urlProp="listURL"
                createProp="handleCreate"
                deleteProp="onModelDelete"
                updateProp="onModelUpdate"
                onCreate={handleAddModel}
                onDelete={handleModelDelete}
                onUpdate={handleModelUpdate}
                focusGroup={modelClass}
                tasksUrlRoot={this.props.definitions[modelClass].url}
                groupDefinitions={this.props.definitions}
              />
            }
          }
        />
      </div>
    );
  }
}

export default ModelsPage;