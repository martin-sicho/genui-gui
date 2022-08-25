import React from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import ObjectGroupsList from "../ObjectSelectionList";
import { scrollTo } from '../../utils';

function HeaderNav(props) {
  return (<UncontrolledDropdown nav inNavbar>
    <DropdownToggle nav>Add New...</DropdownToggle>
    <DropdownMenu>
      {
        props.molSetChoices.map(choice =>
            (<DropdownItem
                key={choice}
                onClick={() => {props.onMolSetChoice(choice, [])}}
            >
              {props.definitions[choice].name}
            </DropdownItem>)
        )
      }
    </DropdownMenu>
  </UncontrolledDropdown>)
}

class CompoundsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: null
    }
  }

  componentDidMount() {
    this.props.setPageHeader(
      <HeaderNav
        {...this.props}
        molSetChoices={Object.keys(this.props.definitions)}
        onMolSetChoice={(choice, array) => {
          this.setState(prevState => {
              prevState.selected = choice;
          });
          this.props.handleAddMolSetList(choice, array);
        }
        }
      />
    );
  }

  render() {
    const molsets = this.props.compoundSets;
    if (molsets === null) {
      return <div>Loading...</div>
    }

    const molsetsEmpty = Object.keys(molsets).length === 0 && molsets.constructor === Object;
    if (molsetsEmpty) {
      return <div><p>There are currently no compound sets. Start by adding one from the actions menu in the top right.</p></div>;
    }

    return (
        <ObjectGroupsList
          {...this.props}
          id="compound-sets-list"
          objects={molsets}
          objectProp='molset'
          groupNameProp='currentMolsetClass'
          urlProp='molsetListUrl'
          ignoreGroups={['MolSet']}
          createProp="handleCreateNew"
          deleteProp="handleDelete"
          updateProp="handleUpdate"
          onDelete={this.props.handleMolSetDelete}
          onCreate={this.props.handleAddMolSet}
          onUpdate={this.props.requestMolSetsUpdate}
          focusGroup={this.state.selected}
          tasksUrlRoot={this.props.apiUrls.compoundSetsRoot}
          groupDefinitions={this.props.definitions}
          // compoundSetsDefinitions={this.props.definitions}
        />
    )
  }
}

export default CompoundsPage;