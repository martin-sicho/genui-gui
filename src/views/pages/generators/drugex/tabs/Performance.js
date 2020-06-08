import React from "react";
import {DrExAgentScoresPlot, DrExAgentSMILESErrorPlot, DrExLossPlot, DrExSMILESErrorPlot} from "./Plots";

export function DrugExAgentPerformanceTab(props) {
    const errors = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugExAgent", props.metrics.find(metric => metric.name === 'SMILES_ER'));
    const errors_uq = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugExAgent", props.metrics.find(metric => metric.name === 'SMILES_UQR'));
    const scores = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugExAgent", props.metrics.find(metric => metric.name === 'DrExActivity'));
    return (
        <div className="drugex-agent-performance-plots">
            <DrExAgentSMILESErrorPlot errors={errors} errorsUnique={errors_uq}/>
            <DrExAgentScoresPlot scores={scores}/>
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