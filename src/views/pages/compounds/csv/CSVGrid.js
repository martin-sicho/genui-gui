import React from 'react';
import {GenericMolSetGrid} from '../../../../genui';
import CSVCard from './CSVCard';
import CSVCardNew from './CSVCardNew';

class CSVGrid extends React.Component {

    render() {
        const listUrl = new URL('csv/', this.props.apiUrls.compoundSetsRoot);
        return (
            <GenericMolSetGrid
                {...this.props}
                headingText="CSV Files"
                cardComponent={CSVCard}
                newCardComponent={CSVCardNew}
                molsetListUrl={listUrl}
            />
        )
    }
}

export default CSVGrid;