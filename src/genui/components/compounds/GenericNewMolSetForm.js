import React from "react";
import {Field, Formik} from "formik";
import {Form, FormGroup, Input, Label} from "reactstrap";
import {FieldErrorMessage} from "../../index";

export default class GenericNewMolSetForm extends React.Component {
    render() {
        const AdditionalFields = this.props.additionalFieldsComponent;
        return (
            <Formik
                initialValues={this.props.initialValues}
                validationSchema={this.props.validationSchema}
                onSubmit={this.props.onSubmit}
            >
                {
                    formik => (
                        <Form id={this.props.formID} onSubmit={formik.handleSubmit} className="unDraggable">
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Field name="name" as={Input} type="text"/>
                            </FormGroup>
                            <FieldErrorMessage name="name"/>
                            <FormGroup>
                                <Label htmlFor="description">Description</Label>
                                <Field name="description" as={Input} type="textarea"/>
                            </FormGroup>
                            <FieldErrorMessage name="description"/>

                            {
                                AdditionalFields ? (
                                    <AdditionalFields {...this.props} formik={formik}/>
                                ) : null
                            }
                        </Form>
                    )
                }
            </Formik>
        )
    }
}