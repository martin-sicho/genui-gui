import { Col, Row } from 'reactstrap';
import {
    MoleculePropsProvider,
    MoleculeActivityProvider,
    MoleculeImage,
    PropertiesTable,
    ActivitySetFlatView,
} from '../../..';
import React from 'react';

export default function CompoundOverview(props) {
    return (
        <React.Fragment>
            {props.showImage ? (
                <Row>
                    <Col sm={12}>
                        <MoleculeImage
                            {...props}
                        />
                    </Col>
                </Row>
            ) : null}

            <Row>
                <Col sm={12}>
                    <h3>Activities</h3>
                    <MoleculeActivityProvider
                        {...props}
                        updateCondition={(prevProps, currentProps) => {
                            return prevProps.mol && (prevProps.mol.id !== currentProps.mol.id)
                        }}
                        component={ActivitySetFlatView}
                    />
                </Col>
            </Row>

            <Row>
                <Col sm={12}>
                    <h3>Properties</h3>
                    <MoleculePropsProvider
                        {...props}
                        propsList={[
                            "AMW",
                            "NUMHEAVYATOMS",
                            "NUMAROMATICRINGS",
                            "HBA",
                            "HBD",
                            "LOGP",
                            "TPSA",
                        ]}
                        updateCondition={(prevProps, currentProps) => {
                            return prevProps.mol && (prevProps.mol.id !== currentProps.mol.id)
                        }}
                        component={PropertiesTable}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}