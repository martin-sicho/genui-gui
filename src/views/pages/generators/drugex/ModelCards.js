import React from "react"
import {groupBy, ModelCard, ModelInfoTab, ModelPerformance} from '../../../../genui';
import {Line} from "react-chartjs-2";

function DrugExAgentPerformanceTab (props) {
  // TODO: finish this
  return <div>Performance here...</div>
}

function DrExLossPlot(props) {
  const losses = groupBy(props.losses, 'extraArgs.isOnValidationSet');
  if (losses.length === 0) {
    return <div>No loss data available.</div>
  }
  const datasets = losses.map(lossGroup => {
    if (lossGroup[0].extraArgs.isOnValidationSet) {
      return {
        label: "Validation Loss",
        data: lossGroup.map(loss => loss.value),
        fill: false,
        backgroundColor: '#ff6384',
        borderColor: '#ff6384'
      }
    } else {
      return  {
        label: "Training Loss",
        fill: false,
        data: lossGroup.map(loss => loss.value),
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb'
      }
    }
  });
  const data = {
    labels: losses[0].map(loss => loss.extraArgs.step),
    datasets: datasets
  };
  return (
      <div className="drugex-net-loss-chart">
        <h4>DrugEx Loss</h4>
        <Line
            data={data}
            options={{
              scales: {
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Step'
                  }
                }],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: 'Loss Value'
                    }
                  }
                ]
              },
              title: {
                display: true,
                text: 'DrugEx Loss'
              }}
            }
        />
      </div>
  );
}

function DrExSMILESErrorPlot(props) {
  // TODO: finish this
  return null;
}

function DrugExNetworkPerformanceTab(props) {

  const losses = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'DrExLoss'));
  const errors = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'SMILES_ER'));

  return (
      <div className="drugex-performance-plots">
        <DrExLossPlot losses={losses}/>
        <DrExSMILESErrorPlot errors={errors}/>
      </div>
  )
}

export class DrugExNetCard extends React.Component {

  render() {
    const model =  this.props.model;
    // const trainingStrategy = model.trainingStrategy;
    const validationStrategy = model.validationStrategy;

    const trainingParams = [
      {
        name : "Training Set",
        value : model.molset ? model.molset.name : "---"
      },
      {
        name : "Parent",
        value : model.parent ? model.parent.name : "---"
      },
    ];

    const validationParams = validationStrategy ? [
      {
        name : "Validation Set Size",
        value : validationStrategy.validSetSize
      }
    ] : [];

    const tabs = [
      {
        title : "Info",
        renderedComponent : ModelInfoTab
      },
      {
        title: "Performance"
        , renderedComponent : (props) =>
          <ModelPerformance
              {...props}
              component={DrugExNetworkPerformanceTab}
          />
      }
    ];

    return <ModelCard {...this.props} tabs={tabs} extraTrainingParams={trainingParams} extraValidationParams={validationParams}/>
  }
}

export class DrugExAgentCard extends React.Component {

  render() {
    const model =  this.props.model;

    const trainingParams = [
      {
        name : "Environment",
        value : model.environment.name
      },
      {
        name : "Exploitation Network",
        value : model.exploitationNet.name
      },
      {
        name : "Exploration Network",
        value : model.explorationNet.name
      },
    ];

    const tabs = [
      {
        title : "Info",
        renderedComponent : ModelInfoTab
      },
      {
        title: "Performance"
        , renderedComponent : (props) =>
          <ModelPerformance
            {...props}
            component={DrugExAgentPerformanceTab}
          />
      }
    ];

    return <ModelCard {...this.props} tabs={tabs} extraTrainingParams={trainingParams}/>
  }
}