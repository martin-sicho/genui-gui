import React, {useState} from 'react';
import {Button, FormGroup, Input, Label, Table} from "reactstrap";
import {Form, Field, Formik} from "formik";
import * as Yup from 'yup';
import {ComponentWithResources, FieldErrorMessage} from "../../../index";

function NewExportForm(props) {
    const exporters = props.exporters;
    const molset = props.molset;
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Formik
            initialValues={{
                name: `${exporters[0].name}`, // FIXME: check if exporter is not empty
                description: `Compounds exported from ${molset.name}.`,
                exporter: exporters[0].id
            }}
            validationSchema={Yup.object({

                name: Yup.string().max(128, 'Must be 128 characters or less.').required('This field is required.'),
                description: Yup.string().max(10000, 'Must be 10,000 characters or less.'),
                exporter: Yup.number().min(1, 'Must be a positive integer').required('This field is required.'),
            })}
            onSubmit={
                (values) => {
                    setIsSubmitting(true);

                    fetch(
                        new URL(`all/${molset.id}/exports/`, props.apiUrls.compoundSetsRoot)
                        , {
                            method: 'POST'
                            , body: JSON.stringify(values)
                            , headers: {
                                'Content-Type': 'application/json'
                            }
                            , credentials: "include",
                        }
                    )
                        .then(response => response.json())
                        .then(data => props.handleCreate(data, true))
                        .catch(
                        (e) => {
                            console.log(e);
                            props.handleCreate(e, false)
                            setIsSubmitting(false);
                        }
                    );
                }
            }
        >
            {
                formik => (
                    <Form onSubmit={formik.handleSubmit} className="unDraggable">

                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Field name="name" as={Input} type="text" placeholder="Export Name"/>
                        </FormGroup>
                        <FieldErrorMessage name="name"/>

                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Field name="description" as={Input} type="textarea" placeholder="Write more about this export if needed..."/>
                        </FormGroup>
                        <FieldErrorMessage name="description"/>

                        <FormGroup>
                            <Label htmlFor="exporter" >Export To</Label>
                            <Field name="exporter" as={Input} type="select">
                                {
                                    exporters.map((exporter) => <option key={exporter.id} value={exporter.id}>{exporter.name}</option>)
                                }
                            </Field>
                            <FieldErrorMessage name="exporter"/>
                        </FormGroup>

                        <Button block type="submit" color="primary" disabled={isSubmitting}>{isSubmitting ? "Submitting" : "Submit"}</Button>
                    </Form>
                )
            }
        </Formik>
    )
}

function ExportsTable(props) {
    return (
        <Table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>File</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {
                    props.exports.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td><a href={item.files[0].file}>Link</a></td>
                        <td><Button block color="danger" onClick={() => props.handleDelete(item)}>X</Button></td>
                    </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default function ExportMolSet(props) {

    const [formShown, setFormShown] = useState(false);
    const [exportsChanged, setExportsChanged] = useState(false)

    return (
        <ComponentWithResources
            {...props}
            definition={{
                exports: new URL(`all/${props.molset.id}/exports/`, props.apiUrls.compoundSetsRoot)
            }}
            updateInterval={2000}
            fetchCondition={
                (props) => {
                    if (exportsChanged) {
                        setExportsChanged(false)
                    }
                    return props.tasksRunning || exportsChanged
                }
            }
        >
            {
                (loaded, data) =>
                    (
                        <React.Fragment>
                            <h4>Exports of {props.molset.name}</h4>

                            {
                                formShown ? (
                                    <NewExportForm
                                        {...props}
                                        handleCreate={
                                            (returnedData, isOK) => {
                                                if (isOK) {
                                                    setFormShown(false);
                                                    setExportsChanged(true)
                                                } else {
                                                    alert('Oops, something went wrong...')
                                                }
                                            }
                                        }
                                    />
                                ) : <Button block color="primary" onClick={() => setFormShown(true)}>Create New</Button>
                            }

                            {
                                loaded ? (
                                    data.exports.length ? (
                                        <ExportsTable exports={data.exports} handleDelete={(item) => {
                                            fetch(
                                                new URL(`all/${props.molset.id}/exports/${item.id}/`, props.apiUrls.compoundSetsRoot)
                                                , {
                                                    method: 'DELETE'
                                                    , credentials: "include",
                                                }
                                            )
                                                .then(() => setExportsChanged(true))
                                                .catch(
                                                    (e) => {
                                                        console.log(e);
                                                    }
                                                );
                                        }}/>
                                    ) : null
                                ) : <div>Loading data...</div>
                            }
                        </React.Fragment>
                    )
            }
        </ComponentWithResources>
    )
}