import React from "react";
import { ModelsPage } from '../../../../genui';
import { DrugExAgentCreateCard, DrugExNetCreateCard, DrugExNetFromFileCard } from './ModelCreateCards';
import { DrugExAgentCard, DrugExNetCard } from './ModelCards';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { scrollTo } from '../../../../genui/utils';

function CreateModelsNav(props) {

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Create Model
      </DropdownToggle>
      <DropdownMenu right>
        <UncontrolledDropdown>
          <DropdownToggle nav>Train...</DropdownToggle>
          <DropdownMenu>
            {
              Object.keys(props.modelConfig).map((modelClass) => {
                const config = props.modelConfig[modelClass];

                if (!config.trainComponent) {
                  return null
                }

                return (
                  <DropdownItem
                    key={modelClass}
                    onClick={() => {props.onModelAdd(config.algorithm, config.trainComponent, config.trainCardSetup, modelClass)}}
                  >
                    {modelClass}
                  </DropdownItem>
                )
              })
            }
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown>
          <DropdownToggle nav>From File...</DropdownToggle>
          <DropdownMenu>
            {
              Object.keys(props.modelConfig).map((modelClass) => {
                const config = props.modelConfig[modelClass];

                if (!config.uploadComponent) {
                  return null
                }

                return (
                  <DropdownItem
                    key={modelClass}
                    onClick={() => {props.onModelAdd(config.algorithm, config.uploadComponent, config.uploadCardSetup, modelClass)}}
                  >
                    {modelClass}
                  </DropdownItem>
                )
              })
            }
          </DropdownMenu>
        </UncontrolledDropdown>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

class DrugExModelList extends React.Component {

  render() {
    return (
        <React.Fragment>
          <h1>{this.props.title}</h1>
          <hr/>
          <ModelsPage
              {...this.props}
              headerComponent={null}
          />
        </React.Fragment>
    )
  }
}

function DrugeExNetGrid(props) {
  return (
      <div className={props.modelClass} id={props.modelClass}>
        <DrugExModelList
            {...props}
            cardSetup={{
              h : {"md" : 12, "sm" : 12},
              w : {"md" : 1, "sm" : 1},
              minH : {"md" : 3, "sm" : 3},
            }}
        />
      </div>
  )
}

function DrugExAgentGrid(props) {
  return (
      <div className={props.modelClass} id={props.modelClass}>
        <DrugExModelList
            {...props}
            cardSetup={{
              h : {"md" : 13, "sm" : 13},
              w : {"md" : 1, "sm" : 1},
              minH : {"md" : 3, "sm" : 3},
            }}
        />
      </div>
  )
}

class DrugExPage extends React.Component {

  constructor(props) {
    super(props);

    this.INIT_MAP = {
      DrugExNetwork : {
        listURL : new URL('networks/', this.props.apiUrls.drugexRoot),
        algorithm: this.props.algorithmChoices.find(algorithm => algorithm.name === "DrugExNetwork"),
        newModelComponent: null,
        newCardSetup: null,
        modelComponent: DrugExNetCard,
        title: "DrugEx Networks",
        selectedToAdd: null,
        trainComponent: DrugExNetCreateCard,
        uploadComponent: DrugExNetFromFileCard,
        trainCardSetup:  {
          h : {"md" : 9, "sm" : 9},
          w : {"md" : 1, "sm" : 1},
          minH : {"md" : 3, "sm" : 3},
        },
        uploadCardSetup:  {
          h : {"md" : 9, "sm" : 9},
          w : {"md" : 1, "sm" : 1},
          minH : {"md" : 3, "sm" : 3},
        },
      },
      DrugExAgent: {
        listURL : new URL('agents/', this.props.apiUrls.drugexRoot),
        algorithm: this.props.algorithmChoices.find(algorithm => algorithm.name === "DrugExAgent"),
        newModelComponent: null,
        modelComponent: DrugExAgentCard,
        title: "DrugEx Agents",
        selectedToAdd: null,
        newCardSetup: null,
        trainComponent: DrugExAgentCreateCard,
        uploadComponent: null,
        trainCardSetup: {
          h : {"md" : 11, "sm" : 11},
          w : {"md" : 1, "sm" : 1},
          minH : {"md" : 3, "sm" : 3},
        },
        uploadCardSetup: null,
      },
    };
    this.state = {
      config : this.INIT_MAP
    }
  }

  handleAddNew = (algorithm, newModelComponent, cardSetup, className) => {
    this.setState((prevState) => {
      prevState.config[algorithm.name] = Object.assign(prevState.config[algorithm.name], {
        selectedToAdd : algorithm,
        newModelComponent : newModelComponent ? newModelComponent : prevState.newModelComponent,
        newCardSetup : cardSetup ? cardSetup : prevState.newCardSetup,
      });
      return prevState
    });

    const elmnt = document.getElementById(className);
    scrollTo(document.documentElement, elmnt.offsetTop, 300);
  };

  componentDidMount() {
    this.props.onHeaderChange(
      <CreateModelsNav
        {...this.props}
        modelConfig={this.state.config}
        onModelAdd={this.handleAddNew}
      />
    );
  }

  render() {
    const netClass = "DrugExNetwork";
    const agentClass = "DrugExAgent";
    return (
        <div className="drugex-models-grids">
          <DrugeExNetGrid
              {...this.props}
              modelClass={netClass}
              {...this.state.config[netClass]}
          />
          <DrugExAgentGrid
              {...this.props}
              modelClass={agentClass}
              {...this.state.config[agentClass]}
              netsUrl={this.state.config[netClass].listURL + `?project_id=${this.props.currentProject.id}`}
          />
        </div>
    );
  }
}

export default DrugExPage;