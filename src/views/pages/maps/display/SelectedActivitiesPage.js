import React from 'react';
import { Col, Row } from 'reactstrap';
import {ActivitiesAggregator, groupBy, TabWidget} from '../../../../genui';
import ActivitySummary from './ActivitySummary';

class SelectedActivitiesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      aggregator: null
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.moleculeSelection.revision !== this.props.moleculeSelection.revision || prevProps.selectedMolsInMap.length !== this.props.selectedMolsInMap.length) {
      if (this.props.moleculeSelection.mols.length === 0) {
        this.setState({aggregator: null})
      } else {
        this.setState({
          // currentSelectionRev: this.props.selectedMolsRevision,
          aggregator: (props) => <ActivitiesAggregator {...props}/>,
        })
      }
    }
  }

  render() {
    return this.state.aggregator ? (
                <React.Fragment>
                  <Row>
                    <Col sm={12}>
                      <this.state.aggregator
                          {...this.props}
                          mols={this.props.selectedMolsInMap}
                      >
                        {
                          (activities) => {
                            if (activities) {
                              const groupedActivities = groupBy(activities, 'type.id');
                              // console.log(groupedActivities);

                              const tabs = groupedActivities.map(group => ({
                                title: group[0].type.value,
                                renderedComponent: (props) => (
                                    <ActivitySummary
                                        {...props}
                                        mols={props.selectedMolsInMap}
                                        type={group[0].type}
                                        activities={group}
                                    />
                                )
                              }));

                              return (
                                  <TabWidget
                                      {...this.props}
                                      tabs={tabs}
                                  />
                              )
                            } else {
                              return <div>Loading activity data...</div>;
                            }
                          }
                        }
                      </this.state.aggregator>
                    </Col>
                  </Row>
                </React.Fragment>
    ) : <p>No compounds selected in the map.</p>
  }
}

export default SelectedActivitiesPage;