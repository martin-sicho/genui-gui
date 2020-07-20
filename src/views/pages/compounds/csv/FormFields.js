import React from 'react';
import {Field} from "formik";
import {FormGroup, FormText, Input, Label} from "reactstrap";
import {FieldErrorMessage, FileUpload} from "../../../../genui";

export default function FormFields(props) {
    return (
        <React.Fragment>
            <h4>CSV File Upload and Processing</h4>

            <FormGroup>
                <Label htmlFor="file">CSV File</Label>
                <Field
                    name="file"
                    component={FileUpload}
                />
                <FormText color="muted">
                    The CSV file to import data from.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="file"/>

            <p>
                If you want to export activity data along with the structures,
                see <a target="_blank" rel="noopener noreferrer" href="https://github.com/martin-sicho/genui/blob/dev/master/src/genui/compounds/extensions/csvimports/test_files/init.csv">
                this example file
                </a> for more information on how to format your data correctly.
                You can tell GenUI what CSV columns contain what data in the form below.
            </p>

            <FormGroup>
                <Label htmlFor="nameCol">Name Column</Label>
                <Field
                    name="nameCol"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Column containing the name of the compound. Automatic compound names are generated
                    if this column is not found. Automatic name is also generated if no name is provided
                    for the compound. Names do not have to be unique.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="nameCol"/>

            <FormGroup>
                <Label htmlFor="activityCol">Activity Column</Label>
                <Field
                    name="activityCol"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Name of the column containing activity values. Data in this column
                    should be a number or appropriately flagged as missing (see below).
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="activityCol"/>

            <FormGroup>
                <Label htmlFor="activityTypeCol">Activity Type Column</Label>
                <Field
                    name="activityTypeCol"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Column containing activity types for the activity values. If an activity
                    value is present, this value must be provided. Otherwise, the activity
                    data is not be entered.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="activityTypeCol"/>

            <FormGroup>
                <Label htmlFor="activityUnitsCol">Activity Units Column</Label>
                <Field
                    name="activityUnitsCol"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Column where unist for the activity value are stored. If this value is empty,
                    the activity value is reported as dimensionless.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="activityUnitsCol"/>

            <FormGroup>
                <Label htmlFor="colSeparator">Column Separator</Label>
                <Field
                    name="colSeparator"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Character by which the columns are separated.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="colSeparator"/>

            <FormGroup>
                <Label htmlFor="emptyValue">Empty Value String</Label>
                <Field
                    name="emptyValue"
                    as={Input}
                    type="text"
                />
                <FormText color="muted">
                    Empty values are automatically inferred from the data, but
                    you should also explicitly specify how empty values
                    are represented for the best results.
                </FormText>
            </FormGroup>
            <FieldErrorMessage name="emptyValue"/>
        </React.Fragment>
    )
}