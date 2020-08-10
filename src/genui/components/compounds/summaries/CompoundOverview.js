import { Col, Row } from 'reactstrap';
import {
    MoleculePropsProvider,
    MoleculeActivityProvider,
    MoleculeImage,
    PropertiesTable,
    ActivitySetFlatView,
    MoleculeProvider,
} from '../../..';
import React from 'react';

export default function CompoundOverview(props) {
  return (
    <MoleculeProvider {...props} molID={props.molID}>
        {
            mol => {
                return (
                    <React.Fragment>
                        {props.showImage ? (
                            <Row>
                                <Col sm={12}>
                                    <MoleculeImage
                                        {...props}
                                        mol={mol}
                                    />
                                </Col>
                            </Row>
                        ) : null}

                        <Row>
                            <Col sm={12}>
                                <h3>Activities</h3>
                                <MoleculeActivityProvider
                                    {...props}
                                    mol={mol}
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
                                    mol={mol}
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
        }
    </MoleculeProvider>
  )
}