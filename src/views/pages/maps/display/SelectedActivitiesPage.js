import React from 'react';
import { Col, Row } from 'reactstrap';
import { ActivitiesAggregator, groupBy, TabWidget } from '../../../../genui';
import ActivitySummary from './ActivitySummary';

class SelectedActivitiesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      aggregator: null
    }
  }

  getAggregator = (mols) => {
    return (props) => <ActivitiesAggregator {...props} mols={mols}/>
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.moleculeSelection.revision !== this.props.moleculeSelection.revision) {
      if (this.props.moleculeSelection.mols.length === 0) {
        this.setState({aggregator: null})
      } else {
        this.setState({
          // currentSelectionRev: this.props.selectedMolsRevision,
          aggregator: this.getAggregator(this.props.moleculeSelection.mols),
        })
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={12}>
            {
              this.state.aggregator ? (
                <this.state.aggregator
                  {...this.props}
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
                                  mols={this.props.moleculeSelection.mols}
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
                        return <div>Loading...</div>;
                      }
                    }
                  }
                </this.state.aggregator>
              ) : <p>No compounds selected.</p>
            }
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default SelectedActivitiesPage;