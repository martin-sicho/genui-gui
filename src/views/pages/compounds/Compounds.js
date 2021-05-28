import React from 'react';
import {ComponentWithObjects, ComponentWithResources, CompoundsPage} from '../../../genui';
import ChEMBLGrid from './chembl/ChEMBLGrid';
import GeneratedGrid from './generated/GeneratedGrid';
import SDFGrid from './sdf/SDFGrid';
import CSVGrid from "./csv/CSVGrid";
import ChEMBLCard from "./chembl/ChEMBLCard";
import GeneratedCard from "./generated/GeneratedCard";
import SDFCard from "./sdf/SDFCard";
import CSVCard from "./csv/CSVCard";

class Compounds extends React.Component {

  render() {
    // const defaultClass = "MolSet";

    const definitions = {
        ChEMBLCompounds: {
            name: 'ChEMBL Sets',
            url: new URL( 'chembl/', this.props.apiUrls.compoundSetsRoot),
            gridComponent: ChEMBLGrid,
            listComponent: ChEMBLCard,
        },
        GeneratedMolSet: {
            name: 'Generated Sets',
            url: new URL( 'generated/', this.props.apiUrls.compoundSetsRoot),
            gridComponent: GeneratedGrid,
            listComponent: GeneratedCard
        },
        SDFCompounds: {
            name: 'SDF Files',
            url: new URL( 'sdf/', this.props.apiUrls.compoundSetsRoot),
            gridComponent: SDFGrid,
            listComponent: SDFCard,
        },
        CSVCompounds: {
            name: 'CSV Files',
            url: new URL( 'csv/', this.props.apiUrls.compoundSetsRoot),
            relativeUrl: 'csv',
            gridComponent: CSVGrid,
            listComponent: CSVCard
        }
    }

    return (
        <ComponentWithResources
            {...this.props}
            definition={{
                exporters: new URL(`exporters/`, this.props.apiUrls.compoundSetsRoot)
            }}
        >
            {
                (loaded, data) => loaded ? <ComponentWithObjects
                    {...this.props}
                    objectListURL={new URL('all/', this.props.apiUrls.compoundSetsRoot)}
                    emptyClassName={'MolSet'}
                    render={
                        (
                            compoundSets,
                            handleAddMolSetList,
                            handleAddMolSet,
                            handleMolSetDelete,
                            requestMolSetsUpdate,
                        ) => {
                            delete compoundSets['MolSet'];
                            return (<CompoundsPage
                                {...this.props}
                                {...data}
                                definitions={definitions}
                                compoundSets={compoundSets}
                                handleAddMolSetList={handleAddMolSetList}
                                handleAddMolSet={handleAddMolSet}
                                handleMolSetDelete={handleMolSetDelete}
                                requestMolSetsUpdate={requestMolSetsUpdate}
                            />)
                        }
                    }
                /> : <div>Loading Resources...</div>
            }
        </ComponentWithResources>
    )
  }
}

export default Compounds;
