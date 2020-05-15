import React from 'react';
import {Table} from 'reactstrap';
import {TableDataFromItems, TableFromItems} from '../../../../genui';
import {ROCCurvePlot} from "./Plots";

function parseCVData(perfMatrix) {
  const ret = {};
  ret[''] = [
    {
      id: 'MIN',
      value: 'MIN'
    },
    {
      id: 'MAX',
      value: 'MAX'
    },
    {
      id: 'AVG',
      value: 'AVG'
    },
    {
      id: 'SD',
      value: 'SD'
    },
  ];
  Object.keys(perfMatrix).forEach(key => ret[key] = []);
  Object.keys(perfMatrix).forEach(key => {
    const tmp = { id: `MIN_${key}` };
    const arr = perfMatrix[key].map(x => x.value);
    tmp['value'] = Math.min(...arr).toPrecision(4);
    ret[key].push(tmp);
  });
  Object.keys(perfMatrix).forEach(key => {
    const tmp = { id: `MAX_${key}` };
    const arr = perfMatrix[key].map(x => x.value);
    tmp['value'] = Math.max(...arr).toPrecision(4);
    ret[key].push(tmp);
  });
  Object.keys(perfMatrix).forEach(key => {
    const tmp = { id: `AVG_${key}` };
    const arr = perfMatrix[key].map(x => x.value);
    tmp['value'] = (arr.reduce((a, b) => a + b, 0) / arr.length).toPrecision(4);
    ret[key].push(tmp);
  });
  Object.keys(perfMatrix).forEach(key => {
    const tmp = { id: `SD_${key}` };
    const arr = perfMatrix[key].map(x => x.value);
    const m = arr.reduce((a, b) => a + b, 0) / arr.length;
    tmp['value'] = (Math.sqrt(arr.reduce((sq, n) => {
      return sq + Math.pow(n - m, 2);
    }, 0) / (arr.length - 1))).toPrecision(4);
    ret[key].push(tmp);
  });
  return ret;
}

function CVOverview(props) {
  const metrics = props.model.validationStrategy.metrics;
  const cvPerf = props.getPerfMatrix(props.performance, 'ModelPerformanceCV', metrics);
  const roc_curve_data = props.getPerfValuesForMetric(props.performance, "ROCCurvePoint", metrics.find(metric => metric.name === "ROC"));
  const curves = {};
  if (cvPerf["ROC"]) {
    cvPerf["ROC"].forEach(auc => {
      curves[auc.id] = []
    });
    roc_curve_data.forEach(point => {
      if (curves.hasOwnProperty(point.extraArgs.auc)) {
        curves[point.extraArgs.auc].push(point);
      }
    });
  }
  const curves_list = [];
  Object.keys(curves).forEach((key, index) => {
    curves_list.push({
      label: `Fold ${index + 1}`,
      tpr: curves[key].map(point => point.value),
      fpr: curves[key].map(point => point.extraArgs.fpr),
    })
  });
  return (
      <React.Fragment>
        <h4>Cross-Validation</h4>

        {
          Object.keys(cvPerf).length > 0 ? (
              <React.Fragment>
                {
                  curves_list.length > 0 ? (
                      <ROCCurvePlot curves={curves_list}/>
                  ) : null
                }

                <h5>Metrics Summary</h5>
                <Table size="sm" hover>
                  <TableFromItems items={parseCVData(cvPerf)}/>
                </Table>
              </React.Fragment>
          ) : <div>No cross-validation data available.</div>
        }
      </React.Fragment>
  )
}

function IndpendentTestSetOverview(props) {
  const metrics = props.model.validationStrategy.metrics;
  let validSetPerf = props.getPerfMatrix(props.performance, 'ModelPerformance', metrics);
  validSetPerf = Object.keys(validSetPerf).map((x) => validSetPerf[x].length > 0 ? validSetPerf[x][0] : null);
  const roc_curve_data = props.getPerfValuesForMetric(props.performance, "ROCCurvePoint", metrics.find(metric => metric.name === "ROC"));
  const auc = validSetPerf.find(item => item ? item.metric.name === "ROC" : false);
  const roc_curve = [];
  if (auc) {
    roc_curve_data.forEach(point => {
      if (point.extraArgs.auc === auc.id) {
        roc_curve.push(point);
      }
    })
  }
  return (
      <React.Fragment>
        <h4>Independent Validation Set</h4>

        {
          validSetPerf[0] !== null ? (
              <React.Fragment>
                {
                  roc_curve.length > 0 ? (
                      <ROCCurvePlot curves={[
                        {
                          tpr: roc_curve.map(point => point.value),
                          fpr: roc_curve.map(point => point.extraArgs.fpr),
                          label: "Independent Set"
                        }
                      ]}/>
                  ) : null
                }

                <h5>Metrics Summary</h5>
                <Table size="sm" hover>
                  <TableDataFromItems
                      items={validSetPerf}
                      dataProps={['value']}
                      conversion={(item) => typeof item === 'number' ? item.toPrecision(4) : item.toString()}
                      rowHeaderProp="metric.name"
                  />
                </Table>
              </React.Fragment>
          ) : <div>No data.</div>
        }
      </React.Fragment>
  )
}

class QSARPerformanceOverview extends React.Component {

  render() {
    if (!this.props.model.validationStrategy) {
      return <p>No performance data for this model is available.</p>
    }

    return (
      <div className="qsar-models-performance-overview">
        <IndpendentTestSetOverview {...this.props}/>
        <CVOverview {...this.props}/>
      </div>
    );
  }
}

export default QSARPerformanceOverview;