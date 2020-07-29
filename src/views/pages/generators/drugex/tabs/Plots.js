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
                    text: 'DrugEx Network Loss'
                }
            }
            }
        />
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
                    text: 'SMILES Error Rate (DrugEx Network)'
                }
            }
            }
        />
    );
}

export function DrExAgentSMILESErrorPlot(props) {
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
        },
        {
            label: "SMILES Error Rate (Unique)",
            fill: false,
            data: props.errorsUnique.map(err => 1 - err.value),
            backgroundColor: '#ff6384',
            borderColor: '#ff6384'
        }
    ];
    const data = {
        labels: props.errors.map(err => err.extraArgs.epoch),
        datasets: datasets
    };
    return (
        <div className="drugex-agent-smierror-chart">
            <h4>SMILES Error Rate</h4>
            <Line
                data={data}
                options={{
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Epoch'
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
                        text: 'SMILES Error Rate (DrugEx Agent)'
                    }
                }
                }
            />
        </div>
    );
}

export function DrExAgentScoresPlot(props) {
    if (props.scores.length === 0) {
        return <div>No data available.</div>
    }

    const datasets = [
        {
            label: "Model Scores",
            fill: false,
            data: props.scores.map(score => score.value),
            backgroundColor: '#36a2eb',
            borderColor: '#36a2eb'
        }
    ];
    const data = {
        labels: props.scores.map(score => score.extraArgs.epoch),
        datasets: datasets
    };
    return (
        <div className="drugex-agent-scores-chart">
            <h4>Environment Model Scores</h4>
            <Line
                data={data}
                options={{
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Epoch'
                            }
                        }],
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Score Value'
                                }
                            }
                        ]
                    },
                    title: {
                        display: true,
                        text: 'DrugEx Agent Environment Model Scores'
                    }
                }
                }
            />
        </div>
    );
}