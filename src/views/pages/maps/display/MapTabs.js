import React from 'react';
import MapPage from './MapPage';
import {MoleculeListProvider, TabWidget} from '../../../../genui';
import SelectedActivitiesPage from './SelectedActivitiesPage';
import SelectedListPage from './SelectedListPage';

export default function MapTabs(props) {
  const [moleculeSelectionInMap, setMoleculeSelectionInMap] =  React.useState({
    revision: 0,
    mols: []
  });

  const tabs = [
    {
      title: "Map",
      renderedComponent: MapPage
    },
    {
      title: "Selected (List)",
      renderedComponent: SelectedListPage
    },
    {
      title: "Selected (Activities)",
      renderedComponent: SelectedActivitiesPage
    },
  ];

  return (
      <TabWidget
          {...props}
          tabs={tabs}
          activeTab={tabs[0].title}
          selectedMolsInMap={moleculeSelectionInMap.mols}
          moleculeSelection={moleculeSelectionInMap}
          onMolsSelect={mols => setMoleculeSelectionInMap(prevState => ({
            revision: prevState.revision + 1,
            mols: mols
          }))}
          onMolsDeselect={() => setMoleculeSelectionInMap(prevState => ({
            revision: prevState.revision + 1,
            mols: []
          }))}
      />
  )
}