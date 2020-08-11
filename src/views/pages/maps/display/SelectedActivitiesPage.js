import React from 'react';
import {Col, Progress, Row} from 'reactstrap';
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
      if (this.props.moleculeSelection.molsCount === 0) {
        this.setState({aggregator: null})
      } else {
        this.setState({
          aggregator: (props) => {
            if (props.selectedMolsInMapLoaded) {
              return <ActivitiesAggregator {...props}/>
            } else {
              return (
                  <React.Fragment>
                    <div>Fetching selected compounds: {props.selectedMolsInMap.length}/{props.moleculeSelection.molsCount}</div>
                    <Progress color="info" value={100 * props.selectedMolsInMap.length / props.moleculeSelection.molsCount}/>
                  </React.Fragment>
              )
            }
          },
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
                          (activities, finished, progress) => {
                            if (finished) {
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
                              progress = Object.keys(progress).map(key => progress[key]);
                              if (progress.length === 0) {
                                return <div><p>Loading activity data...</p></div>
                              }
                              const avgProgress = progress.reduce((a, b) => a + b) / progress.length
                              return (
                                  <React.Fragment>
                                    <div><p>Loading activity data...</p></div>
                                    <Progress color="info" value={avgProgress}/>
                                  </React.Fragment>
                              );
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