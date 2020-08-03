import { Col, Row } from 'reactstrap';
import SelectedList from './SelectedList';
import React from 'react';
import {MoleculeListProvider} from "../../../../genui";

class SelectedListPage extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.moleculeSelection.revision !== this.props.moleculeSelection.revision;
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col sm={12}>
                        {
                            this.props.moleculeSelection.molIDs.length > 0 ? (
                                <MoleculeListProvider
                                    {...this.props}
                                    molIDs={this.props.moleculeSelection.molIDs}
                                >
                                    {
                                        mols => <SelectedList {...this.props} mols={mols}/>
                                    }
                                </MoleculeListProvider>
                            ) : <p>{this.props.emptyMessage ? this.props.emptyMessage : "No compounds selected."}</p>
                        }
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default SelectedListPage