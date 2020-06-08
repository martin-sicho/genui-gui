import React from 'react';
import { Col, Row } from 'reactstrap';
import {ComponentWithResources, MolSetTasks} from '../../../../../genui';

function MolsStats(props) {
  return (
      <React.Fragment>
        <h4>Compounds</h4>
        <p>Unique in Total: {props.moleculesCount}</p>
        <h4>Associated Targets</h4>
        <ul>
          {
            props.molset.targets.map(
                target => (
                    <li key={target.targetID}>
                      <a rel="noopener noreferrer" href={`https://www.ebi.ac.uk/chembl/target_report_card/${target.targetID}/`} target="_blank">{target.targetID}</a> (<a rel="noopener noreferrer" href={`https://www.ebi.ac.uk/chembl/g/#browse/activities/filter/target_chembl_id:${target.targetID}`} target="_blank">activities overview</a>)
                    </li>
                )
            )
          }
        </ul>
      </React.Fragment>
  )
}

class ChEMBLInfo extends React.Component {

  constructor(props) {
    super(props);

    this.molset = this.props.molset;
  }

  render() {
    return (
      <Row>
        <Col sm="12">
          <h4>Description</h4>
          <p>{this.molset.description}</p>
          <ComponentWithResources
            definition={{
              molecules: this.props.moleculesURL
            }}
            updateCondition={(prevProps, currentProps) => prevProps.tasksRunning !== currentProps.tasksRunning}
            updateInterval={5000}
            fetchCondition={(props) => props.tasksRunning}
            tasksRunning={this.props.tasksRunning}
          >
            {
              (allLoaded, data) => {
                  return allLoaded ? (
                    <MolsStats
                        molset={this.props.molset}
                        moleculesCount={data.molecules.count}
                    />
                ) : null
              }
            }
          </ComponentWithResources>
          <MolSetTasks
            {...this.props}
            progressURL={this.props.apiUrls.celeryProgress}
          />
        </Col>
      </Row>
    );
  }
}

export default ChEMBLInfo;