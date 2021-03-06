import React from 'react';
import {ActivitySetStatsTable, ComponentWithResources} from "../../../index";

export default function MolsetActivitiesSummary(props) {
    const definition_summary = {};
    props.molset.activities.forEach(actsetid => definition_summary[actsetid] = new URL(`${actsetid}/summary/`, props.apiUrls.activitySetsRoot));

    const updateCond = (prevProps, nextProps) => prevProps.molset.id !== nextProps.molset.id;
    return (
        <ComponentWithResources
            {...props}
            definition={definition_summary}
            updateCondition={updateCond}
            updateInterval={5000}
            fetchCondition={(props) => props.tasksRunning}
        >
            {
                (summaryLoaded, summaries) => {
                    const definition_actsets = {};
                    props.molset.activities.forEach(actsetid => definition_actsets[actsetid] = new URL(`${actsetid}/`, props.apiUrls.activitySetsRoot));
                    return (
                        <ComponentWithResources
                            {...props}
                            definition={definition_actsets}
                            updateCondition={updateCond}
                        >
                            {(actsetsLoaded, actsets) => {
                                if (summaryLoaded && actsetsLoaded) {
                                    const items = [];
                                    Object.keys(summaries).forEach(actsetID => {
                                        const actset = actsets[actsetID];
                                        summaries[actsetID].typeSummaries.forEach(summary => {
                                            items.push({
                                                id: `${actset.id}_${summary.type.value}`,
                                                name: `${summary.type.value} from ${actset.name}`,
                                                activitySet: actset,
                                                type: summary.type,
                                                molecules: summary.moleculesTotal,
                                                activities: summary.activitiesTotal
                                            })
                                        })
                                    });
                                    return (
                                        <React.Fragment>
                                            {props.message ? <p>{props.message}</p> : null}
                                            <ActivitySetStatsTable
                                                {...props}
                                                summaries={items}
                                                activitySets={actsets}
                                            />
                                        </React.Fragment>
                                    )
                                } else {
                                    return <p>No activity data in this compound set.</p>
                                }
                            }}
                        </ComponentWithResources>
                    )
                }
            }
        </ComponentWithResources>
    )
}