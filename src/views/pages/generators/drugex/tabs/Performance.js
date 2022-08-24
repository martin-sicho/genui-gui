import React from "react";
import {DrExAgentScoresPlot, DrExLossPlot, DrExSMILESErrorPlot} from "./Plots";

export function DrugExAgentPerformanceTab(props) {
    const loss = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'DrExLoss'));
    const errors = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'SMILES_ER'));
    const uniqueness = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'SMILES_UQR'));
    const desirability = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'DrExDesire'));

    return (
        <div className="drugex-agent-performance-plots">
            <DrExLossPlot losses={loss}/>
            <DrExAgentScoresPlot
              datasets={[
                {
                  title: "Desirability",
                  data: desirability,
                  color: "#36a2eb"
                },
                {
                  title: "Error Rate",
                  data: errors,
                  color: "#ff6384"
                },
                {
                  title: "Uniqueness",
                  data: uniqueness,
                  color: "#7fd280"
                }
              ]}
            />
        </div>
    )
}

export function DrugExNetworkPerformanceTab(props) {

    const losses = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'DrExLoss'));
    const errors = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'SMILES_ER'));

    return (
        <div className="drugex-net-performance-plots">
            <div className="drugex-net-loss-chart">
                <h4>Loss Function</h4>
                {
                    losses.length > 0 ? (
                        <DrExLossPlot losses={losses}/>
                    ) : <div>No data.</div>
                }
            </div>

            <div className="drugex-net-smierror-chart">
                <h4>SMILES Error Rate</h4>
                {
                    errors.length > 0 ? (
                        <DrExSMILESErrorPlot errors={errors}/>
                    ) : <div>No data.</div>
                }
            </div>
        </div>
    )
}