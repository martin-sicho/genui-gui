import React from 'react';
import {Field} from "formik";
import {FormGroup, FormText, Input, Label} from "reactstrap";
import {FieldErrorMessage, FileUpload} from "../../../../genui";

export default function FormFields(props) {
    return (
        <React.Fragment>
            <h4>SDF File Upload and Processing</h4>

            <FormGroup>
                <Label htmlFor="file">SDF File</Label>
                <Field
                    name="file"
                    component={FileUpload}
                />
                <FormText color="muted">
                    The SDF file to import data from.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="file"/>

            <p>
                If you want to export activity data along with the structures,
                see <a target="_blank" rel="noopener noreferrer" href="https://github.com/martin-sicho/genui/blob/dev/master/src/genui/compounds/extensions/sdf/test_files/init.sdf">
                this example file
                </a> for more information on how to format your data correctly.
                You can tell GenUI what SDF properties contain what data with the form below.
            </p>

            <FormGroup>
                <Label htmlFor="activitiesProp">SDF Activity Prop</Label>
                <Field
                    name="activitiesProp"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Name of the SDF file property from which activity values should be extracted.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="activitiesProp"/>

            <FormGroup>
                <Label htmlFor="activityTypesProp">SDF Activity Type Prop</Label>
                <Field
                    name="activityTypesProp"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Name of the SDF file property from which activity type for the activity values should be extracted.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="activityTypesProp"/>

            <FormGroup>
                <Label htmlFor="activityUnitsProp">SDF Activity Units Prop</Label>
                <Field
                    name="activityUnitsProp"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Name of the SDF file property from which the units of the activity values will be read.
                    If this property is empty or not found, the activity values are assumed to have no units.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="activityUnitsProp"/>

            <FormGroup>
                <Label htmlFor="dataSeparator">Data Separator</Label>
                <Field
                    name="dataSeparator"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Separator used in the file to denote multiple property values.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="dataSeparator"/>
        </React.Fragment>
    )
}