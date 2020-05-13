import React from 'react';
import { Table } from 'reactstrap';
import {TableDataFromItems, TableFromItems} from '../../../../genui';

class QSARPerformanceOverview extends React.Component {

  parseCVData = (perfMatrix) => {
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
  };

  render() {
    const model = this.props.model;
    const validationStratInfo = model.validationStrategy;
    if (!validationStratInfo) {
      return <p>No performance data for this model is available.</p>
    }

    const performanceInfo = this.props.performance;
    const metrics = validationStratInfo.metrics;

    let validSetPerf = this.props.getPerfMatrix(performanceInfo, 'ModelPerformance', metrics);
    validSetPerf = Object.keys(validSetPerf).map((x) => validSetPerf[x].length > 0 ? validSetPerf[x][0] : null);
    let cvPerf = this.props.getPerfMatrix(performanceInfo, 'ModelPerformanceCV', metrics);

    return (
      <React.Fragment>
        <h4>
          Training Summary
        </h4>

        <h5>Cross-Validation</h5>
        <Table size="sm" hover>
          <TableFromItems items={this.parseCVData(cvPerf)}/>
        </Table>

        <h5>Independent Validation Set</h5>
        {
          validSetPerf[0] !== null ? (
            <Table size="sm">
              <TableDataFromItems
                items={validSetPerf}
                dataProps={['value']}
                rowHeaderProp="metric.name"
              />
            </Table>
          ) : <div>No data.</div>
        }
      </React.Fragment>
    );
  }
}

export default QSARPerformanceOverview;