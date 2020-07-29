import React from 'react';
import {GenericMolSetCard, MolsetActivitiesSummary, MolsInMolSetList, GenericInfo, EditMolSet} from "../../../../genui";

function SDFCard(props) {
    const tabs = [
        {
            title : "Info",
            renderedComponent : GenericInfo,
        },
        {
            title: "Compounds",
            renderedComponent : (props) => (
                <MolsInMolSetList
                    {...props}
                    showInfo={true}
                    extraInfoFields={
                        [
                            {
                                dataItems: ["extraArgs.name"],
                                propNames: ["compoundName"],
                                displayName: "Name (from SDF)",
                                component: props => <span>{props.compoundName}</span>,
                                className: "SDFMolecule"
                            }
                        ]
                    }
                />)
        },
        {
            title: "Activities",
            renderedComponent: props => <MolsetActivitiesSummary {...props} selectable={false}/>
        },
        {
            title: "Edit",
            renderedComponent: props => <EditMolSet {...props}/>
        }
    ];

    return (
        <GenericMolSetCard {...props} tabs={tabs}/>
    )
}

export default SDFCard;