import React from 'react';
import { Table } from 'reactstrap';

export function ActivitySetStatsTable(props) {

  const [clickedID, setClickedID] = React.useState(null);
  return (
    <Table size="sm" responsive hover>
      <thead>
      <tr>
        <th>Activity Type</th>
        <th>Data Points</th>
        <th>Molecules</th>
        <th>Activity Set</th>
      </tr>
      </thead>
      <tbody>
      {
        props.summaries.map(summary => {
          const Data = () => (
            <React.Fragment>
              <td>{summary.type.value}</td>
              <td>{summary.activities}</td>
              <td>{summary.molecules}</td>
              <td>{summary.activitySet.name}</td>
            </React.Fragment>
          );
          if (props.selectable) {
            return (
              <tr key={summary.id} className={clickedID && (clickedID === summary.id) ? "bg-success text-dark" : null} onClick={() => {setClickedID(summary.id); props.onSelect(summary)}}>
                <Data/>
              </tr>
            )
          } else {
            return (
              <tr key={summary.id}>
                <Data/>
              </tr>
            )
          }
        })
      }
      </tbody>
    </Table>
  )
}