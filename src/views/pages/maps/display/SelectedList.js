import { MolSetsTabs, MolsToMolSetGroups } from '../../../../genui';
import React from 'react';
import { AssayName, ChEMBLID, Relation, TargetName } from '../../compounds/chembl/ActivityFields';

export default function SelectedList(props) {
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

  return (
    <MolsToMolSetGroups
      {...props}
      mols={props.mols}
    >
      {
        (groups) => {
          return (
            <MolSetsTabs
              {...props}
              groupedMols={groups}
              mols={props.mols}
              molsetClassToExtraActivityFields={molsetClassToExtraActivityFields}
              molsetClassToExtraInfoFields={molsetClassToExtraInfoFields}
              molsetClassToURLs={molsetClassToURLs}
            />
          );
        }
      }
    </MolsToMolSetGroups>
  );
}