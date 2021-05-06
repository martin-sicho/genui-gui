import { MolSetsTabs, MolsToMolSetGroups } from '../../../../genui';
import React from 'react';

export default function SelectedList(props) {
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
            />
          );
        }
      }
    </MolsToMolSetGroups>
  );
}