import { ComponentWithResources } from '../../../../genui';
import React from 'react';

function AssayLink(props) {
  return <a rel="noopener noreferrer" href={`https://www.ebi.ac.uk/chembl/assay_report_card/${props.assayID}/`} target="_blank">{props.assayID}</a>
}

function TargetLink(props) {
  return <a rel="noopener noreferrer" href={`https://www.ebi.ac.uk/chembl/target_report_card/${props.targetID}/`} target="_blank">{props.targetID}</a>
}

export function AssayName(props) {
  if (props.assayMap.hasOwnProperty(props.assayID)) {
    return <AssayLink assayID={props.assayMap[props.assayID]}/>
  } else {
    const definition = {
      assay: new URL(`assays/${props.assayID}/`, props.molsetListUrl)
    };
    return (
        <ComponentWithResources
            {...props}
            definition={definition}
        >
          {
            (loaded, assayData) => {
              if (loaded) {
                const assayID = assayData.assay.assayID;
                props.addToAssayMap(props.assayID, assayID);
                return <AssayLink assayID={assayID}/>
              } else {
                return <span>-</span>
              }
            }
          }
        </ComponentWithResources>
    )
  }
}

export function TargetName(props) {

  if (props.targetMap.hasOwnProperty(props.targetID)) {
    return <TargetLink targetID={props.targetMap[props.targetID]}/>
  } else {
    const definition = {
      target: new URL(`targets/${props.targetID}/`, props.molsetListUrl)
    };
    return (
        <ComponentWithResources
            {...props}
            definition={definition}
        >
          {
            (loaded, targetData) => {
              if (loaded) {
                const targetID = targetData.target.targetID;
                props.addToTargetMap(props.targetID, targetID);
                return <TargetLink targetID={targetID}/>
              } else {
                return <span>-</span>
              }
            }
          }
        </ComponentWithResources>
    )
  }
}

export function Relation(props) {
  return <span>{props.relation}</span>
}

export function ChEMBLID(props) {
  return <a rel="noopener noreferrer" href={`https://www.ebi.ac.uk/chembl/compound_report_card/${props.compoundID}/`} target="_blank">{props.compoundID}</a>
}