import React from "react";
import { Col, Row} from 'reactstrap';
import {ComponentWithPagedResources} from "../../../index";

class ModelPerformance extends React.Component {

  getPerfValuesForMetric = (performanceInfo, className, metric) => {
    const ret = [];
    performanceInfo.forEach(
      perf => {
        if ((metric ? perf.metric.id === metric.id : true)
          && perf.className === className) {
          ret.push(perf);
        }
      }
    );
    return ret;
  };

  getPerfMatrix = (performanceInfo, className, metrics) => {
    const ret = {};
    metrics.forEach(
      metric => {
        ret[metric.name] = this.getPerfValuesForMetric(performanceInfo, className, metric);
      });
    return ret;
  };

  render() {
    const SummaryComponent = this.props.component;

    return (<Row>
      <Col sm="12">
        <ComponentWithPagedResources
          definition={{
            performance: new URL('performance', this.props.modelUrl)
          }}
          updateInterval={2000}
          updateCondition={() => {
            return this.props.tasks.running.length > 0;
          }}
        >
          {
            (data, allLoaded, revision) => {
              if (!SummaryComponent) {
                return this.props.render(data.performance, allLoaded, revision, this.getPerfMatrix, this.getPerfValuesForMetric)
              } else {
                return (
                    <SummaryComponent
                        {...this.props}
                        {...data}
                        performanceDataComplete={allLoaded}
                        performanceDataRevision={revision}
                        getPerfMatrix={this.getPerfMatrix}
                        getPerfValuesForMetric={this.getPerfValuesForMetric}
                    />
                )
              }
            }
          }
        </ComponentWithPagedResources>
      </Col>
    </Row>)
  }
}

export default ModelPerformance;