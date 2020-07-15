import React from 'react';
import {Col, Row} from "reactstrap";
import ComponentWithResources from "../../ComponentWithResources";
import MolSetTasks from "../MolSetTasks";

function MolsStats(props) {
    return (
        <React.Fragment>
            <h4>Compounds</h4>
            <p>Unique in Total: {props.moleculesCount}</p>
        </React.Fragment>
    )
}

class GenericInfo extends React.Component {

    constructor(props) {
        super(props);

        this.molset = this.props.molset;
    }

    render() {
        return (
            <Row>
                <Col sm="12">
                    <MolSetTasks
                        {...this.props}
                        progressURL={this.props.apiUrls.celeryProgress}
                    />
                    {
                        this.molset.description ? (
                            <React.Fragment>
                                <h4>Description</h4>
                                <p>{this.molset.description}</p>
                            </React.Fragment>
                        ) : null
                    }
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
                                    this.props.customMolStats ? <this.props.customMolStats molset={this.props.molset} moleculesCount={data.molecules.count}/> : (
                                        <MolsStats
                                        molset={this.props.molset}
                                        moleculesCount={data.molecules.count}
                                    />)
                                ) : null
                            }
                        }
                    </ComponentWithResources>
                </Col>
            </Row>
        );
    }
}

export default GenericInfo;