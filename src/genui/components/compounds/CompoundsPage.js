import React from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import {scrollTo} from '../../utils';
import CompoundSetsGrids from "./CompoundSetGrids";

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
              {props.classToNameMap[choice] ? props.classToNameMap[choice] : choice}
            </DropdownItem>)
        )
      }
    </DropdownMenu>
  </UncontrolledDropdown>)
}

class CompoundsPage extends React.Component {

  constructor(props) {
    super(props);

    this.defaultClass = this.props.defaultClass;
    this.ignoreDefault = this.props.ignoreDefault;
    this.classToComponent = this.props.classToComponentMap;
    this.classToComponentNoIgnore = this.ignoreDefault ? Object.keys(this.classToComponent).reduce((object, key) => {
      if (key !== this.defaultClass) {
        object[key] = this.classToComponent[key]
      }
      return object
    }, {}) : undefined;
    this.state = {
      selected: null
    }
  }

  componentDidMount() {
    this.props.setPageHeader(
      <HeaderNav
        {...this.props}
        molSetChoices={Object.keys(this.ignoreDefault ? this.classToComponentNoIgnore : this.classToComponent)}
        onMolSetChoice={(choice, array) => {
          this.setState({selected: choice}, () => {
            const elmnt = document.getElementById(choice);
            scrollTo(document.documentElement, elmnt.offsetTop, 300);
            // elmnt.scrollIntoView();
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

    const molsetsEmpty = Object.keys(molsets).length === 1 && molsets[this.props.defaultClass].length === 0 && molsets.constructor === Object;
    if (molsetsEmpty) {
      return <div><p>There are currently no compound sets. Start by adding one from the actions menu in the top right.</p></div>;
    }


    return (
        <React.Fragment>
          <CompoundSetsGrids {...this.props} classToComponentNoIgnore={this.classToComponentNoIgnore} classToComponent={this.classToComponent}/>
        </React.Fragment>
    )
  }
}

export default CompoundsPage;