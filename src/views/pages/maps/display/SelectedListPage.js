import {Col, Progress, Row} from 'reactstrap';
import SelectedList from './SelectedList';
import React from 'react';

class SelectedListPage extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.moleculeSelection.revision !== this.props.moleculeSelection.revision
            || nextProps.selectedMolsInMap.length !== this.props.selectedMolsInMap.length;
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col sm={12}>
                        {
                            this.props.moleculeSelection.mols.length > 0 ? (
                                this.props.selectedMolsInMapLoaded ? (
                                    <SelectedList {...this.props} mols={this.props.selectedMolsInMap}/>
                                ) : (
                                    <React.Fragment>
                                        <div>Fetching selected compounds: {this.props.selectedMolsInMap.length}/{this.props.moleculeSelection.molsCount}</div>
                                        <Progress color="info" value={100 * this.props.selectedMolsInMap.length / this.props.moleculeSelection.molsCount}/>
                                    </React.Fragment>
                                )
                            ) : <p>No compounds selected in the map.</p>
                        }
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default SelectedListPage