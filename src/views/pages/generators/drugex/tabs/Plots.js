import {groupBy} from "../../../../../genui";
import {Line} from "react-chartjs-2";
import React from "react";

export function DrExLossPlot(props) {
    const losses = groupBy(props.losses, 'extraArgs.isOnValidationSet');
    if (losses.length === 0) {
        return <div>No data available.</div>
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
            return {
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
                    }
                }
                }
            />
        </div>
    );
}

export function DrExSMILESErrorPlot(props) {
    if (props.errors.length === 0) {
        return <div>No data available.</div>
    }

    const datasets = [
        {
            label: "SMILES Error Rate",
            fill: false,
            data: props.errors.map(err => err.value),
            backgroundColor: '#36a2eb',
            borderColor: '#36a2eb'
        }
    ];
    const data = {
        labels: props.errors.map(err => err.extraArgs.step),
        datasets: datasets
    };
    return (
        <div className="drugex-net-smierror-chart">
            <h4>DrugEx SMILES Error Rate</h4>
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
                                    labelString: 'Error Value'
                                }
                            }
                        ]
                    },
                    title: {
                        display: true,
                        text: 'Error Rate'
                    }
                }
                }
            />
        </div>
    );
}