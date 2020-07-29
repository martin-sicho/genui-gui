import React from "react";
import {Button, CardBody, CardFooter} from 'reactstrap';
import * as Yup from 'yup';
import GenericNewMolSetForm from "./GenericNewMolSetForm";

export function NewMolSetFormRenderer(props) {
  const [formIsSubmitting, setFormIsSubmitting] = React.useState(false);

  const initialValues = Object.assign({
    name: 'New Compound Set Name',
    description: 'Detailed description of the compound set...'
  }, props.extraFormInitVals);
  const validationSchema = Yup.object(
    Object.assign({
      name: Yup.string()
        .max(256, 'Name must be less than 256 character long.')
        .required('Name is required.'),
      description: Yup.string()
        .max(10000, 'Description must be 10,000 characters or less'),
    }, props.extraFormValidSchemas)
  );

  const submitButtonText = props.submitButtonText ? props.submitButtonText : 'Create';
  const id = props.formID ? props.formID : `${props.currentMolsetClass}-create-form`;
  const FormWrapper = props.formWrapper ? props.formWrapper : CardBody;
  const ButtonWrapper = props.buttonWrapper ? props.buttonWrapper : CardFooter;
  return (
    <React.Fragment>
      <FormWrapper className="scrollable">
        <GenericNewMolSetForm
          {...props}
          formID={id}
          initialValues={props.initialValues ? props.initialValues : initialValues}
          validationSchema={props.validationSchema ? props.validationSchema : validationSchema}
          onSubmit={
            (values) => {
              setFormIsSubmitting(true);

                values.project = props.currentProject.id;
                if (props.prePOST) {
                    values = props.prePOST(values);
                }
                // console.log(data);

                // find out if we have a file in the form data
                // if yes, send a multipart request instead of plain json
                let isMultiPart = false;
                const multipartData = new FormData();
                for (let item in values) {
                    if (values.hasOwnProperty(item)) {
                        const itemData = values[item];
                        if (itemData instanceof File) {
                            isMultiPart = true;
                        }
                        multipartData.append(item, itemData);
                    }
                }
                // multipartData.forEach((item, name) => console.log(name, item));

              props.handleCreate(isMultiPart ? multipartData : values, isMultiPart, setFormIsSubmitting);
            }
          }
        />
      </FormWrapper>
      <ButtonWrapper>
        <Button block form={id} type="submit" color="primary" disabled={formIsSubmitting}>{formIsSubmitting ? `${submitButtonText}...` : submitButtonText}</Button>
      </ButtonWrapper>
    </React.Fragment>
  );
}

export default NewMolSetFormRenderer;