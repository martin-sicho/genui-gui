import React from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import {scrollTo} from '../../utils';
import CompoundSetsGrids from "./CompoundSetGrids";
import ObjectGroupsList from "../ObjectSelectionList";

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
      selected: null,
      inGrid: {}
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
              const prevGrid = prevState.inGrid;
              if (!prevGrid.hasOwnProperty(choice)) {
                  prevGrid[choice] = [];
                  return prevState;
              }
          }, () => {
            const elmnt = document.getElementById(choice);
            scrollTo(document.documentElement, elmnt.offsetTop, 300);
            elmnt.scrollIntoView();
          });
          this.props.handleAddMolSetList(choice, array);
        }
        }
      />
    );
  }

  handleAdd = (className, molset) => {
      this.setState({selected: null}, () => {
          let elmnt = document.getElementById(`${className}-group-list`);
          if (elmnt) {
              scrollTo(document.documentElement, elmnt.offsetTop, 300);
              elmnt.scrollIntoView();
          } else {
              elmnt = document.getElementById("compound-sets-list");
              scrollTo(document.documentElement, elmnt.offsetTop, 300);
              elmnt.scrollIntoView();
          }
          this.props.handleAddMolSet(className, molset);
      })
  }

  handleDelete = (name, molset) => {
      this.setState(prevState => {
          if (prevState.inGrid.hasOwnProperty(name)) {
              const group = prevState.inGrid[name];
              const deletedIndex = group.findIndex((item) => item.id === molset.id);
              group.splice(deletedIndex, 1);
              return prevState;
          }
      });
      this.props.handleMolSetDelete(name, molset);
  }

  sendToGrid = (e, className, item, inGrid) => {
      if (!inGrid) {
          this.setState((prevState) => {
              const previousGrid = prevState.inGrid;
              if (previousGrid.hasOwnProperty(className)) {
                  previousGrid[className].push(item);
                  prevState.inGrid = previousGrid;
                  return prevState;
              } else {
                  prevState.inGrid[className] = [item];
                  return prevState;
              }
          })
      } else {
          this.setState((prevState) => {
              const previousItems = prevState.inGrid[className];
              const index = previousItems.findIndex(inside => inside.id === item.id);
              previousItems.splice(index, 1);
              if (previousItems.length === 0) {
                  delete prevState.inGrid[className];
                  return prevState;
              } else {
                  prevState.inGrid[className] = previousItems;
                  return prevState;
              }
          })
      }
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
        <React.Fragment>
          <ObjectGroupsList
            {...this.props}
            id="compound-sets-list"
            objects={molsets}
            objectProp='molset'
            groupNameProp='currentMolsetClass'
            urlProp='molsetListUrl'
            ignoreGroups={['MolSet']}
            tasksUrlRoot={this.props.apiUrls.compoundSetsRoot}
            groupDefinitions={this.props.definitions}
            compoundSetsDefinitions={this.props.definitions}
            handleSendToGrid={this.sendToGrid}
            handleMolSetDelete={this.handleDelete}
          />
          <hr/>
          <CompoundSetsGrids
              {...this.props}
              selectedNewClass={this.state.selected}
              compoundSets={this.state.inGrid}
              handleMolSetDelete={this.handleDelete}
              handleAddMolSet={this.handleAdd}
          />
        </React.Fragment>
    )
  }
}

export default CompoundsPage;