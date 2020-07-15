import React from 'react';
import {GenericMolSetGrid} from '../../../../genui';
import SDFCard from './SDFCard';
import SDFCardNew from './SDFCardNew';

class SDFGrid extends React.Component {

    render() {
        const listUrl = new URL('sdf/', this.props.apiUrls.compoundSetsRoot);
        return (
            <GenericMolSetGrid
                {...this.props}
                headingText="SDF Files"
                cardComponent={SDFCard}
                newCardComponent={SDFCardNew}
                molsetListUrl={listUrl}
            />
        )
    }
}

export default SDFGrid;