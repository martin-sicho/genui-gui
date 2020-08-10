import React from 'react';
import { ComponentWithResources } from '../../../index';

function MoleculeActivityProvider(props) {
    const mol = props.mol;
    const activitySets = props.activitySets;
    const ListComp = props.component;

    if (mol.activities) {
        return (
            <ListComp {...props} activities={mol.activities}/>
        )
    } else {
        const definition = {};
        Object.keys(activitySets).forEach(actSetID => {
            definition[actSetID] = new URL(`${mol.id}/activities/?activity_set=${actSetID}`, props.apiUrls.compoundsRoot);
        });

        return (
            <React.Fragment>
                {/*<h4>Activity Data</h4>*/}
                <ComponentWithResources
                    {...props}
                    definition={definition}
                    // mol={mol}
                    // updateCondition={(prevProps, currentProps) => {
                    //   return prevProps.mol && (prevProps.mol.id !== currentProps.mol.id)
                    // }}
                >
                    {
                        (dataLoaded, activities) => {
                            return dataLoaded ? (
                                <ListComp {...props} activities={activities}/>
                            ) : <div>Fetching activity data...</div>
                        }
                    }
                </ComponentWithResources>
            </React.Fragment>
        )
    }
}

export default MoleculeActivityProvider;