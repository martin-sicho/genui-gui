import React from 'react';
import {ComponentWithObjects, PLOTLY_COLORS} from '../../../../genui';
import MapSelect from './MapSelect';
import {AssayName, ChEMBLID, Relation, TargetName} from "../../compounds/chembl/ActivityFields";

function Maps(props) {
  const defaultMapClass = "Map";
  const molsetColorList = PLOTLY_COLORS;

    // custom settings for ChEMBL extension
    const molsetClassToExtraActivityFields = {
        "ChEMBLCompounds" : [
            {
                dataItems: ["extraArgs.relation"],
                propNames: ["relation"],
                displayName: "Relation",
                component: Relation,
                className: "ChEMBLActivity"
            },
            {
                dataItems: ["extraArgs.assay"],
                propNames: ["assayID"],
                displayName: "Assay",
                component: AssayName,
                className: "ChEMBLActivity"
            },
            {
                dataItems: ["extraArgs.target"],
                propNames: ["targetID"],
                displayName: "Target",
                component: TargetName,
                className: "ChEMBLActivity"
            },
        ]
    };

    const molsetClassToExtraInfoFields = {
        "ChEMBLCompounds" : [
            {
                dataItems: ["extraArgs.chemblID"],
                propNames: ["compoundID"],
                displayName: "ChEMBL ID",
                component: ChEMBLID,
                className: "ChEMBLMolecule"
            }
        ]
    };

    const molsetClassToURLs = {
        "ChEMBLCompounds" : new URL('chembl/', props.apiUrls.compoundSetsRoot)
    };

    const [assayMap, setAssayMap] = React.useState({});
    const [targetMap, setTargetMap] = React.useState({});

  return (
    <ComponentWithObjects
      objectListURL={props.apiUrls.mapsRoot}
      emptyClassName={defaultMapClass}
      currentProject={props.currentProject}
      render={
        (mapObjects) => {
          const maps = mapObjects[defaultMapClass];
          return <MapSelect
              {...props}
              molsetClassToExtraActivityFields={molsetClassToExtraActivityFields}
              molsetClassToExtraInfoFields={molsetClassToExtraInfoFields}
              molsetClassToURLs={molsetClassToURLs}
              assayMap={assayMap}
              targetMap={targetMap}
              addToAssayMap={(id, chemblID) => {
                  if (!assayMap.hasOwnProperty(id)) {
                      assayMap[id] = chemblID;
                      setAssayMap(assayMap)
                  }
              }}
              addToTargetMap={(id, chemblID) => {
                  if (!targetMap.hasOwnProperty(id)) {
                      targetMap[id] = chemblID;
                      setTargetMap(targetMap)
                  }
              }}
              maps={maps}
              molsetColorList={molsetColorList}
          />
        }
      }
    />
  )
}

export default Maps;
