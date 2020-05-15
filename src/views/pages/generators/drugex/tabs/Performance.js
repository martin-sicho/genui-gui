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
            <DrExLossPlot losses={losses}/>
            <DrExSMILESErrorPlot errors={errors}/>
        </div>
    )
}