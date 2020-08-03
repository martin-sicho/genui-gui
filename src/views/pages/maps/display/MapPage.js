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
    mol = !(this.props.moleculeSelection.molIDs.length === 1) ? mol : this.props.moleculeSelection.molIDs[0];
    if (!this.state.hoverMolID || (mol !== this.state.hoverMolID)) {
      this.setState({
        hoverMolID : mol,
        hoverOverview: (props) => <CompoundOverview {...props} molID={mol} />
      })
    }
  };

  render() {
    const selectedMap = this.props.selectedMap;
    return (
      selectedMap ? (
        <Row>
          <Col md={9} sm={10}>
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

          <Col md={3} sm={2}>
            {
              this.state.hoverOverview ? (
                <this.state.hoverOverview
                  {...this.props}
                  map={selectedMap}
                />
              ) : <div><p>Hover over a point in the map to see more.</p></div>
            }
          </Col>
        </Row>
      ) : <div>Select a map to display from the menu.</div>
    )
  }
}

export default MapPage;