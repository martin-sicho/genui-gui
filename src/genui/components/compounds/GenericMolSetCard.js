import React from "react";
import { Button, CardBody, CardFooter, CardHeader, CardSubtitle } from 'reactstrap';
import {ExportMolSet, TabWidget} from '../../index';
import MolSetTasks from "./MolSetTasks";

class GenericMolSetCard extends React.Component {
  abort = new AbortController();

  constructor(props) {
    super(props);

    this.state = {
      molset : null
      , isUpdating : false
      , revision: 0
      , deleteInProgress: false
    }
  }

  handleDeleteSignal(deletedMolSet) {
    this.setState({deleteInProgress : true});
    if (this.props.hasOwnProperty("handleMolSetDelete")) {
      this.props.handleMolSetDelete(this.props.currentMolsetClass, deletedMolSet);
    }
  }

  componentDidMount() {
    this.fetchMolSet();
  }

  fetchMolSet() {
    const molsetURL = new URL(`${this.props.molset.id}/`, this.props.molsetListUrl);
    fetch(molsetURL, {signal : this.abort.signal, credentials: "include",})
        .then(response => this.props.handleResponseErrors(response))
        .then(data => {
          this.setState(prevState => ({
            molset : data,
            revision: prevState.revision + 1
          }))
        })
        .catch(
            (error) => console.log(error)
        )
  }

  componentWillUnmount() {
    this.abort.abort();
  }

  updateMolSet = () => {
    this.fetchMolSet();
  };

  handleTaskUpdate = (tasks) => {
    if (tasks.running.length > 0) {
      this.setState({isUpdating : true});
    } else {
      this.setState({isUpdating : false});
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.molset && this.state.molset && (this.state.revision === prevState.revision)) {
      this.fetchMolSet();
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !this.state.molset || this.state.isUpdating !== nextState.isUpdating || this.state.revision !== nextState.revision;
  }

  render() {
    const molset = this.state.molset;
    const isUpdating = this.state.isUpdating;

    if (!molset) {
      return <div>Fetching...</div>
    }

    const created = new Date(this.state.molset.created);
    const updated = new Date(this.state.molset.updated);
    const molsetURL = new URL(`${this.state.molset.id}/`, this.props.molsetListUrl);
    const moleculesURL = new URL(`${this.state.molset.id}/molecules/`, this.props.apiUrls.compoundSetsRoot);
    return (
      <React.Fragment>
        <CardHeader>{molset.name}</CardHeader>

        <CardBody className="scrollable">
          <CardSubtitle>
            <p>
              Created: {
              created.toLocaleDateString()
              + ' – ' + created.toLocaleTimeString()
            }
              <br/>
              Last Update: {
              updated.toLocaleDateString()
              + ' – ' + updated.toLocaleTimeString()
            }
            </p>
            <MolSetTasks
                {...this.props}
                progressURL={this.props.apiUrls.celeryProgress}
            /><br/>
          </CardSubtitle>
          <TabWidget
            {...this.props}
            tabs={this.props.tabs.concat([{
              title: "Export",
              renderedComponent: props => <ExportMolSet {...props}/>
            }])}
            molsetIsUpdating={isUpdating}
            moleculesURL={moleculesURL}
            molsetUURL={molsetURL}
            molset={molset}
            updateMolSet={this.updateMolSet}
            tasksRunning={isUpdating}
            onTaskUpdate={this.handleTaskUpdate}
          />
        </CardBody>

        <CardFooter>
          <Button color="danger" onClick={() => {this.handleDeleteSignal(molset)}} disabled={this.state.deleteInProgress}>Delete</Button>
        </CardFooter>
      </React.Fragment>
    )
  }
}

export default GenericMolSetCard;