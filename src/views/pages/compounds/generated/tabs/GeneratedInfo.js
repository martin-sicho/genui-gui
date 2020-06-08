import { Col, Row } from 'reactstrap';
import {ComponentWithResources, MolSetTasks} from '../../../../../genui';
import React from 'react';

function MolSetInfo(props) {
  const molset = props.molset;

  return (
    <React.Fragment>
      <h4>Description</h4>
      <p>{molset.description}</p>

      <h4>Compounds</h4>
      <p>Unique in Total: {props.moleculesCount}</p>
    </React.Fragment>
  )
}

function GeneratedInfo(props) {
    console.log(props.tasksRunning);
    return (
        <Row>
            <Col sm="12">
                <ComponentWithResources
                    definition={{
                        molecules: props.moleculesURL
                    }}
                    updateCondition={(prevProps, currentProps) => prevProps.tasksRunning !== currentProps.tasksRunning}
                    updateInterval={5000}
                    fetchCondition={() => props.tasksRunning}
                >
                    {
                        (allLoaded, data) => {
                            return allLoaded ? (
                                <MolSetInfo
                                    molset={props.molset}
                                    moleculesCount={data.molecules.count}
                                />
                            ) : null
                        }
                    }
                </ComponentWithResources>
                <MolSetTasks
                    {...props}
                    progressURL={props.apiUrls.celeryProgress}
                />
            </Col>
        </Row>
    )
}

export default GeneratedInfo;