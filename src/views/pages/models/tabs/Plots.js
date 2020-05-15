import {PLOTLY_COLORS} from "../../../../genui";
import {Scatter} from "react-chartjs-2";
import React from "react";

export function ROCCurvePlot(props) {
    if (props.curves.length === 0) {
        return <div>No data.</div>
    }

    const datasets = props.curves.map((curve, index) => {
        if (index >= PLOTLY_COLORS.length) {
            index = index % PLOTLY_COLORS.length;
        }
        const color = PLOTLY_COLORS[index];

        return {
            label: curve.label,
            showLine: true,
            lineTension: 0,
            fill: false,
            data: curve.tpr.map((tpr, index) => ({
                x: curve.fpr[index],
                y: tpr
            })),
            backgroundColor: color,
            borderColor: color
        }
    });
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
                }
            }
            }
        />
    );
}