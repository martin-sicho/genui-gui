import React from 'react';
import {Col, Row} from "reactstrap";
import ComponentWithResources from "../../ComponentWithResources";

function MolsStats(props) {
    return (
        <React.Fragment>
            <h4>Compounds</h4>
            <p>Unique in Total: {props.moleculesCount}</p>
        </React.Fragment>
    )
}

class GenericInfo extends React.Component {
    render() {
        const moleculesUrl = `${this.props.apiUrls.compoundsRoot.toString()}sets/${this.props.molset.id}/molecules/`;
        return (
            <Row>
                <Col sm="12">
                    {
                        this.props.molset.description ? (
                            <React.Fragment>
                                <h4>Description</h4>
                                <p>{this.props.molset.description}</p>
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
                    <h4>Useful API URLs</h4>
                    <a href={this.props.molsetUURL.toString()} target="_blank" rel="noopener noreferrer">{this.props.molsetUURL.toString()}</a>
                    <br/>
                    <a href={moleculesUrl} target="_blank" rel="noopener noreferrer">{moleculesUrl}</a>
                </Col>
            </Row>
        );
    }
}

export default GenericInfo;