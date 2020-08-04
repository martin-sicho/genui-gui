import React from 'react';
import {ComponentWithResources} from "../../index";

export function MoleculeProvider(props) {
    return (
        <ComponentWithResources
            {...props}
            definition={{
                mol: new URL(`${props.molID}/`, props.apiUrls.compoundsRoot)
            }}
        >
            {
                (loaded, data) => loaded ? props.children(data.mol) : <div>Loading molecule data...</div>
            }
        </ComponentWithResources>
    )
}

export function MoleculeListProvider (props) {
    const molIDs = props.molIDs;
    const definition = {};
    molIDs.forEach(molID => definition[molID] = new URL(`${molID}/`, props.apiUrls.compoundsRoot));

    return (
        <ComponentWithResources
            {...props}
            definition={definition}
        >
            {
                (allLoaded, data) => {
                    return props.children(Object.keys(data).map(molID => data[molID]), allLoaded);
                }
            }
        </ComponentWithResources>
    )
}