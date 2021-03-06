import React from 'react';
import { Card, CardTitle, Col, Row } from 'reactstrap';
import { MoleculeImage, MoleculePropsProvider, PropertiesTable } from '../../../../genui';
import ActivitySummaryPlotter from './ActivitySummaryPlotter';
import SelectedList from "./SelectedList";

function ActivitySummaryPlot(props) {
  const [hoverMol, setHoverMol] = React.useState(null);

  return (
    <Row>
      <Col sm={8}>
        <ActivitySummaryPlotter
          {...props}
          onMolHover={setHoverMol}
        />
      </Col>
      <Col sm={4}>
        {hoverMol ? (
          <React.Fragment>
            <MoleculeImage mol={hoverMol}/>
            <hr/>
            <Card body>
              <CardTitle>Properties</CardTitle>
              {/*<CardText>*/}
              {/*<MoleculeMetadata mol={hoverMol}/>*/}
              {/*</CardText>*/}
              <MoleculePropsProvider
                {...props}
                mol={hoverMol}
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
            </Card>
          </React.Fragment>
        ) : <p>Hover over a point in the plot to see details.</p>}
      </Col>
    </Row>
  )
}

export default function ActivitySummary(props) {

  const [moleculeSelectionInOverview, setMoleculeSelectionInOverview] = React.useState({
      revision: 0,
      mols: []
  });
  const uniqueMols = [];
  moleculeSelectionInOverview.mols.forEach(mol => {
     if (!uniqueMols.find(item => mol.id === item.id)) {
         uniqueMols.push(mol);
     }
  });

  return (
    <React.Fragment>
      <ActivitySummaryPlot
        {...props}
        onMolsSelect={mols => setMoleculeSelectionInOverview(prevState => ({
            revision: prevState.revision + 1,
            mols: mols
        }))}
        onMolsDeselect={() => setMoleculeSelectionInOverview(prevState => ({
            revision: prevState.revision + 1,
            mols: []
        }))}
      />
      <hr/>

    <Row>
        <Col sm={12}>
            {
                uniqueMols.length > 0 ? (
                    <SelectedList {...props} mols={uniqueMols}/>
                ) : <p>Select points in the plot above to see the list of compounds associated with those activities.</p>
            }
        </Col>
    </Row>
    </React.Fragment>
  )
}