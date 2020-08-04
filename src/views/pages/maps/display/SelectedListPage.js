import { Col, Row } from 'reactstrap';
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
                            this.props.moleculeSelection.molIDs.length > 0 ? (
                                <SelectedList {...this.props} mols={this.props.selectedMolsInMap}/>
                            ) : <p>No compounds selected in the map.</p>
                        }
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default SelectedListPage