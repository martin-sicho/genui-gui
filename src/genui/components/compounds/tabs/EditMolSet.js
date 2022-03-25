import React from 'react';
import NewMolSetFormRenderer from "../NewMolSetFormRenderer";
// import * as Yup from "yup";
// import {FormGroup, FormText, Input, Label} from "reactstrap";
// import {Field} from "formik";
// import {FieldErrorMessage} from "../../../index";

// function ExtraFormFields(props) {
//     return (
//         <React.Fragment>
//             <FormGroup check>
//                 <Label check htmlFor="updateData">
//                     <Field name="updateData" as={Input} type="checkbox"/>{' '}
//                     Update Data
//                 </Label>
//                 <FormText color="muted">
//                     Check this box if you want to update this compound set.
//                     Depending on the compound set, this could mean
//                     either downloading data again from an online resource
//                     or uploading and parsing a new file.
//                 </FormText>
//             </FormGroup>
//             <FieldErrorMessage name="updateData"/>
//
//             <br/>
//
//         </React.Fragment>
//     )
// }

export default function EditMolSet(props) {
    const molset = props.molset;

    // const extraInitVals = {
    //     updateData : false,
    // };
    //
    // const extraValidSchemas = {
    //     updateData: Yup.bool()
    // };

    return (
        <React.Fragment>
            <h4>Edit {props.molset.name}</h4>

            <NewMolSetFormRenderer
                {...props}
                formID={`${props.currentMolsetClass}-${props.molset.id}-edit-from`}
                formWrapper={(props) => (
                    <React.Fragment>
                        {props.children}
                    </React.Fragment>
                )}
                buttonWrapper={React.Fragment}
                submitButtonText="Update"
                initialValues={{
                    name: molset.name,
                    description: molset.description
                }}
                // extraInitVals={extraInitVals}
                // extraValidSchemas={extraValidSchemas}
                // additionalFieldsComponent={ExtraFormFields}
                handleCreate={(data, isMultiPart, setFormIsSubmitting) => {
                    fetch(
                        new URL(`${props.molset.id}/`, props.molsetListUrl)
                        , {
                            method: 'PATCH'
                            , body: isMultiPart ? data : JSON.stringify(data)
                            , headers: isMultiPart ?
                                undefined :
                                {
                                    'Content-Type': 'application/json'
                                },
                            credentials: "include",
                        }
                    )
                    .then(response => response.json())
                    .then(data => {
                        // props.updateMolSet(data);
                        setFormIsSubmitting(false);
                        props.requestMolSetsUpdate();
                    }
                    ).catch(
                    (e) => {
                        console.log(e);
                        setFormIsSubmitting(false);
                    }
                    );
                }}/>
        </React.Fragment>
    )
}