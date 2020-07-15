import React from 'react';
import * as Yup from "yup";
import {GenericNewMolSetCard} from "../../../../genui";
import FormFields from "./FormFields";

class SDFCardNew extends React.Component {

    render() {
        const extraInitVals = {
            file : undefined,
            activitiesProp : 'GENUI_ACTIVITIES',
            activityTypesProp : 'GENUI_ACTIVITY_TYPES',
            activityUnitsProp : 'GENUI_ACTIVITY_UNITS',
            dataSeparator: ','
        };

        const extraValidSchemas = {
            file: Yup.mixed().required("SDF file is required."),
            activitiesProp: Yup.string(),
            activityTypesProp: Yup.string(),
            activityUnitsProp: Yup.string(),
            dataSeparator: Yup.string(),
        };

        return (
            <GenericNewMolSetCard
                {...this.props}
                cardHeader="Import compounds from an SDF file."
                extraFormInitVals={extraInitVals}
                extraFormValidSchemas={extraValidSchemas}
                additionalFieldsComponent={FormFields}
            />
        )
    }

}

export default SDFCardNew;