import React from 'react';
import { ComponentWithObjects, CompoundsPage } from '../../../genui';
import ChEMBLGrid from './chembl/ChEMBLGrid';
import GeneratedGrid from './generated/GeneratedGrid';
import SDFGrid from './sdf/SDFGrid';
import CSVGrid from "./csv/CSVGrid";

class Compounds extends React.Component {
  CLASS_TO_COMPONENT = {
    ChEMBLCompounds : ChEMBLGrid,
    GeneratedMolSet : GeneratedGrid,
    SDFCompounds : SDFGrid,
    CSVCompounds : CSVGrid
  };
  CLASS_TO_NAME = {
      ChEMBLCompounds : 'ChEMBL Set',
      GeneratedMolSet : 'Generated Set',
      SDFCompounds : 'SDF File',
      CSVCompounds : 'CSV File'
  };

  render() {
    const defaultClass = "MolSet";
    return (
      <ComponentWithObjects
        {...this.props}
        objectListURL={new URL('all/', this.props.apiUrls.compoundSetsRoot)}
        emptyClassName={defaultClass}
        render={
          (
            compoundSets,
            handleAddMolSetList,
            handleAddMolSet,
            handleMolSetDelete,
            requestMolSetsUpdate,
          ) => {
            return (<CompoundsPage
              {...this.props}
              classToComponentMap={this.CLASS_TO_COMPONENT}
              classToNameMap={this.CLASS_TO_NAME}
              compoundSets={compoundSets}
              defaultClass={defaultClass}
              ignoreDefault={true}
              handleAddMolSetList={handleAddMolSetList}
              handleAddMolSet={handleAddMolSet}
              handleMolSetDelete={handleMolSetDelete}
              requestMolSetsUpdate={requestMolSetsUpdate}
            />)
          }
        }
      />
    )
  }
}

export default Compounds;
