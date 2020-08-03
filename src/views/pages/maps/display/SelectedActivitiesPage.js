import React from 'react';
import { Col, Row } from 'reactstrap';
import {ActivitiesAggregator, groupBy, MoleculeListProvider, TabWidget} from '../../../../genui';
import ActivitySummary from './ActivitySummary';

class SelectedActivitiesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      aggregator: null
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.moleculeSelection.revision !== this.props.moleculeSelection.revision) {
      if (this.props.moleculeSelection.molIDs.length === 0) {
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
        <MoleculeListProvider {...this.props} molIDs={this.props.moleculeSelection.molIDs}>
          {
            (mols) => (
                <React.Fragment>
                  <Row>
                    <Col sm={12}>
                      <this.state.aggregator
                          {...this.props}
                          mols={mols}
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
                                        mols={mols}
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
            )
          }
        </MoleculeListProvider>
    ) : <p>No compounds selected in the map.</p>
  }
}

export default SelectedActivitiesPage;