import React from "react"
import {
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import { Field } from 'formik';
import { FileUpload, ComponentWithResources, FieldErrorMessage, FormikModelUploadForm, ModelCardNew } from '../../../../genui';
import * as Yup from 'yup';

function DrugExNetValidationFields(props) {
  const validationStrategyPrefix = props.validationStrategyPrefix;

  return (
    <React.Fragment>
      <FormGroup row>
        <Label htmlFor={`${validationStrategyPrefix}.validSetSize`} sm={4}>Validation Set Size</Label>
        <Col sm={8}>
          <Field name={`${validationStrategyPrefix}.validSetSize`} as={Input} type="number" step="1"/>
        </Col>
      </FormGroup>
      <FieldErrorMessage name={`${validationStrategyPrefix}.validSetSize`}/>
    </React.Fragment>
  )
}

function DrugExAgentValidationFields(props) {
  const validationStrategyPrefix = props.validationStrategyPrefix;

  return (
    <React.Fragment>
      <FormGroup row>
        <Label htmlFor={`${validationStrategyPrefix}.validSetSize`} sm={4}>Validation Set Size</Label>
        <Col sm={8}>
          <Field name={`${validationStrategyPrefix}.validSetSize`} as={Input} type="number" step="1"/>
        </Col>
      </FormGroup>
      <FieldErrorMessage name={`${validationStrategyPrefix}.validSetSize`}/>
    </React.Fragment>
  )
}

function DrugExNetTrainingFields(props) {
  const trainingStrategyPrefix = props.trainingStrategyPrefix;

  return (
    <React.Fragment>

      <FormGroup row>
        <Label htmlFor={`${trainingStrategyPrefix}.modelClass`} sm={4}>Model Class</Label>
        <Col sm={8}>
          <Field name={`${trainingStrategyPrefix}.modelClass`} as={Input} type="select">
            {
              props.drexnetAlgorithms.map((model) => <option key={model.value} value={model.value}>{model.display_name}</option>)
            }
          </Field>
        </Col>
      </FormGroup>
      <FieldErrorMessage name={`${trainingStrategyPrefix}.modelClass`}/>

      <FormGroup row>
        <Label htmlFor={`${trainingStrategyPrefix}.inputType`} sm={4}>Input Type</Label>
        <Col sm={8}>
          <Field name={`${trainingStrategyPrefix}.inputType`} as={Input} type="select">
            {
              props.drexnetInputTypes.map((model) => <option key={model.value} value={model.value}>{model.display_name}</option>)
            }
          </Field>
        </Col>
      </FormGroup>
      <FieldErrorMessage name={`${trainingStrategyPrefix}.inputType`}/>
    </React.Fragment>
  )
}

function DrugExNetExtraFields(props) {
  return (
    <React.Fragment>
      <FormGroup>
        <Label htmlFor="molset">Corpus</Label>
        <Field name="molset" as={Input} type="select">
          {
            props.molsets.map((molset) => <option key={molset.id} value={molset.id}>{molset.name}</option>)
          }
        </Field>
      </FormGroup>
      <FieldErrorMessage name="molset"/>

      <FormGroup>
        <Label htmlFor="parent">Parent Network</Label>
        <Field name="parent" as={Input} type="select">
          <option key="empty-parent" value=''>---</option>
          {
            props.models.map((model) => <option key={model.id} value={model.id}>{model.name}</option>)
          }
        </Field>
      </FormGroup>
      <FieldErrorMessage name="parent"/>
    </React.Fragment>
  )
}

function InfoCard(props) {
  return (
    <React.Fragment>
      <CardHeader>{props.title}</CardHeader>
      <CardBody className="scrollable">
        {props.text}
      </CardBody>
    </React.Fragment>
  )
}

export class DrugExNetCreateCard extends React.Component {

  render() {
    let molsets = [];
    Object.keys(this.props.compoundSets).forEach(
      (key) => molsets = molsets.concat(this.props.compoundSets[key])
    );

    if (molsets.length < 1) {
      return <InfoCard title="No Compound Sets" text="You need to create a compound set before training a DrugEx network."/>
    }

    const validationStrategyInit = {
      validSetSize: 512,
    };
    const trainingStrategyInit = {
      inputType: this.props.drexnetInputTypes[0].value,
      modelClass: this.props.drexnetAlgorithms[0].value
    }
    const extraParamInit = {
      parent: this.props.models.length > 0 ? this.props.models[this.props.models.length - 1].id : undefined,
      molset: molsets[0].id,
    };

    const validationStrategySchema = {
      validSetSize: Yup.number().integer().min(0, 'Validation set size must be positive or zero.'),
    };
    const trainingStrategySchema = {
      inputType: Yup.string().required("You have to specify input type."),
      modelClass: Yup.string().required("You have to specify model class.")
    }
    const extraParamsSchema = {
      parent: Yup.number().integer().positive('Parent network ID must be a positive integer.'),
      molset: Yup.number().integer().positive('Molecule set ID must be a positive integer.').required('You need to supply a set of compounds to create the corpus from.')
    };

    return (
      <ModelCardNew
        {...this.props}
        molsets={molsets}
        validationStrategyInit={validationStrategyInit}
        trainingStrategyInit={trainingStrategyInit}
        extraParamsInit={extraParamInit}
        validationStrategySchema={validationStrategySchema}
        trainingStrategySchema={trainingStrategySchema}
        extraParamsSchema={extraParamsSchema}
        validationStrategyFields={DrugExNetValidationFields}
        trainingStrategyFields={DrugExNetTrainingFields}
        extraFields={DrugExNetExtraFields}
        disabledModelFormFields={['validationStrategy.metrics', 'trainingStrategy.mode']}
      />
    )
  }
}

function DrugExAgentTrainingFields(props) {
  const trainingStrategyPrefix = props.trainingStrategyPrefix;
  return (
    <React.Fragment>
      <FormGroup row>
        <Label htmlFor={`${trainingStrategyPrefix}.explorer`} sm={4}>Explorer</Label>
        <p>Suitable choice for your model should already be preselected.</p>
        <Col sm={8}>
          <Field name={`${trainingStrategyPrefix}.explorer`} as={Input} type="select">
            {
              props.drexagentExplorers.map((model) => <option key={model.value} value={model.value}>{model.display_name}</option>)
            }
          </Field>
        </Col>
      </FormGroup>
      <FieldErrorMessage name={`${trainingStrategyPrefix}.explorer`}/>
    </React.Fragment>
  )
}

function DrugExAgentExtraFields(props) {
  return (
    <React.Fragment>
      <FormGroup>
        <Label htmlFor="environment">Environment</Label>
        <Field name="environment" as={Input} type="select">
          {
            props.environments.map((environment) => <option key={environment.id} value={environment.id}>{environment.name}</option>)
          }
        </Field>
      </FormGroup>
      <FieldErrorMessage name="environment"/>

      <FormGroup>
        <Label htmlFor="exploitationNet">Exploitation Network</Label>
        <Field name="exploitationNet" as={Input} type="select">
          {
            props.networks.map((network) => <option key={network.id} value={network.id}>{network.name}</option>)
          }
        </Field>
      </FormGroup>
      <FieldErrorMessage name="exploitationNet"/>

      <FormGroup>
        <Label htmlFor="explorationNet">Exploration Network</Label>
        <Field name="explorationNet" as={Input} type="select">
          {
            props.networks.map((network) => <option key={network.id} value={network.id}>{network.name}</option>)
          }
        </Field>
      </FormGroup>
      <FieldErrorMessage name="explorationNet"/>
    </React.Fragment>
  )
}

function DrugExAgentCreateCardRenderer(props) {
  const infoTitle = "DrugEx Agent Unavailable";
  if (props.environments.length === 0) {
    return <InfoCard title={infoTitle} text="You have to create a QSAR model before you can train the DrugEx agent. DrugEx agent needs it to create an environment for the generator."/>
  }

  if (props.networks.length < 2) {
    return <InfoCard title={infoTitle} text="You have to create a DrugEx exploitation and exploration network before you can train the DrugEx agent."/>
  }

  const trainingStrategyInit = {
    explorer: props.drexagentExplorers[0].value,
  }
  const trainingStrategySchema = {
    explorer: Yup.string().required("You have to specify an explorer.")
  }

  const validationStrategyInit = {
    validSetSize: 512,
  };
  const validationStrategySchema = {
    validSetSize: Yup.number().integer().min(0, 'Validation set size must be positive or zero.'),
  };

  const extraParamInit = {
    environment: props.environments[0].id,
    exploitationNet: props.networks[props.networks.length - 1].id,
    explorationNet: props.networks[0].id,
  };

  const extraParamsSchema = {
    environment: Yup.number().integer().positive('A QSAR model for the environment must be specified as a positive integer ID.').required('You need to supply a QSAR model as the environment.'),
    exploitationNet: Yup.number().integer().positive('Exploitation network must be specified as a positive integer ID.').required('You need to supply an exploitation network.'),
    explorationNet: Yup.number().integer().positive('Exploration network must be specified as a positive integer ID.').required('You need to supply an exploration network.'),
  };

  return (
    <ModelCardNew
      {...props}
      environments={props.environments}
      networks={props.networks}
      trainingStrategyInit={trainingStrategyInit}
      trainingStrategySchema={trainingStrategySchema}
      trainingStrategyFields={DrugExAgentTrainingFields}
      validationStrategyInit={validationStrategyInit}
      validationStrategySchema={validationStrategySchema}
      validationStrategyFields={DrugExAgentValidationFields}
      extraParamsInit={extraParamInit}
      extraParamsSchema={extraParamsSchema}
      extraFields={DrugExAgentExtraFields}
      disabledModelFormFields={['validationStrategy.metrics', 'trainingStrategy.mode']}
    />
  )
}

export function DrugExAgentCreateCard (props) {
  return (
    <ComponentWithResources
      {...props}
      definition={{
          networks: props.netsUrl
      }}
    >
        {
            (loaded, data) => {
                if (loaded) {
                    return (
                        <DrugExAgentCreateCardRenderer
                            {...props}
                            {...data}
                        />
                    )
                } else {
                    return <div>Loading...</div>
                }
            }
        }
    </ComponentWithResources>
  )
}

function ExtraFields(props) {

  return (
    <React.Fragment>
      <FormGroup>
        <Label htmlFor="vocabulary">Vocabulary File</Label>
        <Field
          name="vocabulary"
          component={FileUpload}
        />
        <FormText color="muted">
          Vocabulary file. This should be a text file with '.txt'
          extension. It is automatically generated when a DrugEx
          network is trained.
        </FormText>
      </FormGroup>
      <FieldErrorMessage name="vocabulary"/>

      <Field name="vocabulary_note" as={Input} type="text" hidden/>
    </React.Fragment>
  )
}

export function DrugExNetFromFileCard(props) {
  const extraParamInit = {
    vocabulary: undefined,
    vocabulary_note: "drugex_voc",
  };

  const extraParamsSchema = {
    vocabulary: Yup.mixed().required('Vocabulary file must be specified.'),
    vocabulary_note: Yup.string().matches(/drugex_voc/).required('Vocabulary file note is required'),
  };

  return (
    <ModelCardNew
      {...props}
      form={FormikModelUploadForm}
      formNameSuffix="create-upload"
      omitAlgParams={true}
      omitValidation={true}
      enableFileUploads={true}
      extraParamsInit={extraParamInit}
      extraParamsSchema={extraParamsSchema}
      extraFields={ExtraFields}
    />)
}