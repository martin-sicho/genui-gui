import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import React from 'react';
import {CompoundOverview, MoleculeProvider} from '../../../../genui';
import ChemSpacePlotFromFile from "./ChemSpacePlotFromFile";

class MapPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverMol: null,
      hoverOverview: null
    }
  }

  handleMolHover = (mol, point) => {
    if (!this.state.hoverMol || (mol !== this.state.hoverMol)) {
      this.setState({
        hoverMol : mol,
        hoverOverview: (props) => {
          return (
              <MoleculeProvider {...props} molID={mol}>
                {
                  (mol) => <CompoundOverview {...props} mol={mol} showImage={true} />
                }
              </MoleculeProvider>
          )
        }
      })
    }
  };

  render() {
    const selectedMap = this.props.selectedMap;
    return (
      selectedMap ? (
        <Row>
          <Col md={8} sm={8}>
            <Card>
              <CardBody>
                <ChemSpacePlotFromFile
                  {...this.props}
                  map={selectedMap}
                  onMolHover={this.handleMolHover}
                />
              </CardBody>
            </Card>
          </Col>

          <Col md={4} sm={4}>
            {
              this.state.hoverOverview ? (
                <this.state.hoverOverview
                  {...this.props}
                  map={selectedMap}
                />
              ) : <div><p>Hover over a point in the map to see compound details. If there is only one molecule in your selection, it will also be shown here.</p></div>
            }
          </Col>
        </Row>
      ) : <div>Select a map to display from the menu.</div>
    )
  }
}

export default MapPage;