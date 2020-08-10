import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import React from 'react';
import Map from './Map';
import { CompoundOverview } from '../../../../genui';

class MapPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverMolID: null,
      hoverOverview: null
    }
  }

  handleMolHover = (mol, point) => {
    mol = !(this.props.moleculeSelection.mols.length === 1) ? mol : this.props.moleculeSelection.mols[0].id;
    if (!this.state.hoverMolID || (mol !== this.state.hoverMolID)) {
      this.setState({
        hoverMolID : mol,
        hoverOverview: (props) => <CompoundOverview {...props} molID={mol} showImage={true} />
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
                <Map
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
              ) : <div><p>Hover over a point in the map to see more. If there is only one molecule in your selection, it will also be shown here.</p></div>
            }
          </Col>
        </Row>
      ) : <div>Select a map to display from the menu.</div>
    )
  }
}

export default MapPage;