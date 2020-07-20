import React from 'react';
import * as Yup from "yup";
import {GenericNewMolSetCard} from "../../../../genui";
import FormFields from "./FormFields";

class CSVCardNew extends React.Component {

    render() {
        const extraInitVals = {
            file : undefined,
            nameCol : 'NAME',
            smilesCol : 'SMILES',
            activityCol : 'ACTIVITY',
            activityTypeCol: 'ACTIVITY_TYPE',
            activityUnitsCol: 'ACTIVITY_UNITS',
            colSeparator: ',',
            emptyValue: 'NA',
        };

        const extraValidSchemas = {
            file: Yup.mixed().required("CSV file is required."),
            nameCol : Yup.string(),
            smilesCol : Yup.string(),
            activityCol : Yup.string(),
            activityTypeCol: Yup.string(),
            activityUnitsCol: Yup.string(),
            colSeparator: Yup.string().required('Column separator must be provided.').length(1, 'Column separator must be a single character.'),
            emptyValue: Yup.string(),
        };

        return (
            <GenericNewMolSetCard
                {...this.props}
                cardHeader="Import compounds from a CSV file."
                extraFormInitVals={extraInitVals}
                extraFormValidSchemas={extraValidSchemas}
                additionalFieldsComponent={FormFields}
            />
        )
    }

}

export default CSVCardNew;