import React from "react";
import {DrExLossPlot, DrExSMILESErrorPlot} from "./Plots";

export function DrugExAgentPerformanceTab(props) {
    // TODO: finish this
    return <div>Performance here...</div>
}

export function DrugExNetworkPerformanceTab(props) {

    const losses = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'DrExLoss'));
    const errors = props.getPerfValuesForMetric(props.performance, "ModelPerformanceDrugEx", props.metrics.find(metric => metric.name === 'SMILES_ER'));

    return (
        <div className="drugex-performance-plots">
            <DrExLossPlot losses={losses}/>
            <DrExSMILESErrorPlot errors={errors}/>
        </div>
    )
}