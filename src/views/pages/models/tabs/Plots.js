import {PLOTLY_COLORS} from "../../../../genui";
import {Scatter} from "react-chartjs-2";
import React from "react";

export function ROCCurvePlot(props) {
    if (props.curves.length === 0) {
        return null
    }

    const datasets = [{
        label: 'Baseline',
        showLine: true,
        fill: false,
        pointRadius: 0,
        data: [
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 1,
            }
        ]
    }].concat(props.curves.map((curve, index) => {
        if (index >= PLOTLY_COLORS.length) {
            index = index % PLOTLY_COLORS.length;
        }
        const color = PLOTLY_COLORS[index];

        return {
            label: curve.label,
            showLine: true,
            lineTension: 0.5,
            fill: false,
            data: curve.tpr.map((tpr, index) => ({
                x: curve.fpr[index],
                y: tpr
            })),
            pointRadius: 0,
            backgroundColor: color,
            borderColor: color
        }
    }));
    const data = {
        datasets: datasets
    };

    return (
        <Scatter
            data={data}
            options={{
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'False Positive Rate'
                        }
                    }],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'True Positive Rate'
                            }
                        }
                    ]
                },
                title: {
                    display: true,
                    text: 'ROC Curve (Independent Test Set)'
                },
                apsectRatio: 1
            }
            }
        />
    );
}