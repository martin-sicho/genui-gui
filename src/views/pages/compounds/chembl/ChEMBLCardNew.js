import React from 'react';
import {Button, Col, FormGroup, FormText, Input, Label, Row, UncontrolledAlert} from 'reactstrap';
import * as Yup from 'yup';
import { Field, FieldArray } from 'formik';
import { FieldErrorMessage, GenericNewMolSetCard } from '../../../../genui';

function ExtraFormFields(props) {
  const formik = props.formik;
  return (
    <React.Fragment>
      <FieldArray
        name="targets"
        render={(arrayHelpers) => (
          <React.Fragment>
            <FormGroup>
              <Label htmlFor="Targets">Target IDs</Label>
              {formik.values.targets && formik.values.targets.length > 0 ? (
                formik.values.targets.map((target, index) => (
                  <React.Fragment key={index}>
                    <FormGroup>
                      <Row>
                        <Col sm={10}>
                          <Field name={`targets.${index}`} as={Input} type="text" />
                        </Col>
                        <Col sm={2}>
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {arrayHelpers.insert(index, "")}} // insert an empty string at a position
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FieldErrorMessage name={`targets.${index}`}/>
                  </React.Fragment>
                ))
              ) : (
                <Button type="button" onClick={() => arrayHelpers.push("")}>
                  {/* show this when user has removed all targets from the list */}
                  Add ChEMBL Target ID
                </Button>
              )}
                <FormText color="muted">
                    ChEMBL IDs of the targets for which compounds and activity data should be fetched.
                </FormText>
            </FormGroup>
            {typeof formik.errors.targets === 'string' ?
              <UncontrolledAlert color="danger">{formik.errors.targets}</UncontrolledAlert>
              : null}
          </React.Fragment>
        )}
      />
      <FormGroup>
        <Label htmlFor="maxPerTarget">Compounds Max</Label>
        <Field name="maxPerTarget" as={Input} type="number"/>
          <FormText color="muted">
              Maximum number of unique compounds allowed per target
              in the resulting set. This is useful for testing.
              Leave this empty to get all available molecules.
          </FormText>
      </FormGroup>
      <FieldErrorMessage name="maxPerTarget"/>
    </React.Fragment>
  )
}

class ChEMBLCardNew extends React.Component {

  render() {
    const extraInitVals = {
      targets : [],
      maxPerTarget : ''
    };

    const extraValidSchemas = {
      targets: Yup.array().of(Yup.string().required("Empty target not allowed")).required("Must provide at least one target."),
      maxPerTarget: Yup.number().min(1, 'Number of compounds must be empty or set to more than 0.')
    };

    return (
      <GenericNewMolSetCard
        {...this.props}
        cardHeader="Download Compounds from ChEMBL"
        extraFormInitVals={extraInitVals}
        extraFormValidSchemas={extraValidSchemas}
        additionalFieldsComponent={ExtraFormFields}
        prePOST={data => {
            if (!data.maxPerTarget) {
                delete data.maxPerTarget;
            }
            return data;
        }}
      />
    )
  }

}

export default ChEMBLCardNew;