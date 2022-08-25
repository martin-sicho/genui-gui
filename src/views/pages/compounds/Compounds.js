import React from 'react';
import {ComponentWithObjects, ComponentWithResources, CompoundsPage} from '../../../genui';
import ChEMBLCard from "./chembl/ChEMBLCard";
import GeneratedCard from "./generated/GeneratedCard";
import SDFCard from "./sdf/SDFCard";
import CSVCard from "./csv/CSVCard";
import ChEMBLCardNew from './chembl/ChEMBLCardNew';
import GeneratedCardNew from './generated/GeneratedCardNew';
import SDFCardNew from './sdf/SDFCardNew';
import CSVCardNew from './csv/CSVCardNew';

class Compounds extends React.Component {

  render() {
    const definitions = {
        ChEMBLCompounds: {
            name: 'ChEMBL Sets',
            url: new URL( 'chembl/', this.props.apiUrls.compoundSetsRoot),
            newComponents: [{
                label: "New",
                component: ChEMBLCardNew
            }],
            listComponent: ChEMBLCard,
        },
        GeneratedMolSet: {
            name: 'Generated Sets',
            url: new URL( 'generated/', this.props.apiUrls.compoundSetsRoot),
            newComponents:[{
              label: "New",
              component: GeneratedCardNew
            }],
            listComponent: GeneratedCard
        },
        SDFCompounds: {
            name: 'SDF Files',
            url: new URL( 'sdf/', this.props.apiUrls.compoundSetsRoot),
            newComponents: [{
              label: "New",
              component: SDFCardNew
            }],
            listComponent: SDFCard,
        },
        CSVCompounds: {
            name: 'CSV Files',
            url: new URL( 'csv/', this.props.apiUrls.compoundSetsRoot),
            relativeUrl: 'csv',
            newComponents: [{
              label: "New",
              component: CSVCardNew
            }],
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
