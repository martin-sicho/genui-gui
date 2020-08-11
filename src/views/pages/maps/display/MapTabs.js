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
      title: props.selectedMap.name,
      renderedComponent: MapPage
    },
    {
      title: "Selection List",
      renderedComponent: SelectedListPage
    },
    {
      title: "Selection Activities",
      renderedComponent: SelectedActivitiesPage
    },
  ];

  return (
      <MoleculeListProvider {...props} molIDs={moleculeSelectionInMap.mols}>
        {
          (selectedMols, selectedMolsLoaded) => {
            const selection = {
              revision: moleculeSelectionInMap.revision,
              mols: selectedMols,
              molsCount: moleculeSelectionInMap.mols.length
            };
            return (
                <TabWidget
                    {...props}
                    tabs={tabs}
                    activeTab={tabs[0].title}
                    selectedMolsInMap={selectedMols}
                    selectedMolsInMapLoaded={selectedMolsLoaded}
                    moleculeSelection={selection}
                    onMolsSelect={molIDs => setMoleculeSelectionInMap(prevState => ({
                      revision: prevState.revision + 1,
                      mols: molIDs
                    }))}
                    onMolsDeselect={() => setMoleculeSelectionInMap(prevState => ({
                      revision: prevState.revision + 1,
                      mols: []
                    }))}
                />
            )}
        }
      </MoleculeListProvider>
  )
}