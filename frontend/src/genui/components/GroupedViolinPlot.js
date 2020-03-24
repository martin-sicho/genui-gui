import React from 'react';
import Plot from 'react-plotly.js';

class GroupedViolinPlot extends React.Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // console.log(nextProps.selectedMolsRevision);
    // console.log(this.props.selectedMolsRevision);
    if (this.plotlyRef && this.plotlyRef.resizeHandler) {
      this.plotlyRef.resizeHandler();
    }
    return nextProps.selectedMolsRevision !== this.props.selectedMolsRevision;
  }

  render() {

    const traceDefaults = {
      type: 'violin',
      points: 'all',
      box: {
        visible: true
      },
      meanline: {
        visible: true
      }
    };

    // console.log(this.props.title);
    // console.log(traceDefaults);
    // console.log(this.props.traces);

    const data = [];
    Object.keys(this.props.traces).forEach(key => {
        const traceData = this.props.traces[key];
        data.push({...traceDefaults, ...{
            x: traceData.x,
            y: traceData.y,
            customdata: traceData.customdata,
            legendgroup: traceData.name,
            scalegroup: traceData.name,
            name: traceData.name,
          }
        });
      }
    );

    // console.log(traceDefaults);
    // console.log(data);

    // const data = [
    //   {
    //     x: ['group1', 'group2', 'group1', 'group2'],
    //     y: [1, 2, 1, 2],
    //     legendgroup: 'M',
    //     scalegroup: 'M',
    //     name: 'M',
    //     // line: {
    //     //   color: 'blue',
    //     // },
    //   },
    //   {
    //     type: 'violin',
    //     x: ['group1', 'group2', 'group1', 'group2'],
    //     y: [2, 3, 2, 3],
    //     legendgroup: 'F',
    //     scalegroup: 'F',
    //     name: 'F',
    //     box: {
    //       visible: true
    //     },
    //     // line: {
    //     //   color: 'pink',
    //     // },
    //     meanline: {
    //       visible: true
    //     }
    //   }
    // ];

    const layout = {
      title: this.props.title,
      violinmode: 'group',
      autosize: true,
      yaxis: {
        zeroline: false
      },
      showlegend: true
    };

    const config = {
      responsive: false,
    };

    return (
      <div className="genui-activity-summary-violin-plot">
        <Plot
          ref={plotlyRef => {
            this.plotlyRef = plotlyRef;
          }}
          data={data}
          layout={layout}
          useResizeHandler={true}
          config={config}
          style={{width: "100%", height: "100%"}}
          onHover={this.props.onHover}
        />
      </div>
    )
  }
}

export default GroupedViolinPlot;