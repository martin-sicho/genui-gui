import React from "react";
import { ComponentWithObjects, ComponentWithResources, TabWidget } from '../../../../../genui';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader, FormGroup, Input, Label,
  UncontrolledAccordion,
} from 'reactstrap';
import Form from '@rjsf/bootstrap-4';
import ProjectItemSubTitle from '../../../../../genui/components/ProjectItemCardSubtitle';

function EnvCreatorForm(props) {
  const schema = {
    type: "object",
    properties: {
      name : {type: "string", title: "Name", minLength: 1, default: ""},
      description: {type: "string", title: "Description", default: ""},
      rewardScheme: {type: "string", title: "Reward Scheme", enum: props.rewards.map(item => item.display_name), default: props.rewards[0].display_name}
    }
  }
  const uiSchema = {
    "description": {
      "ui:widget": "textarea"
    }
  };
  return (
    <Form schema={schema}
          // formData={newEnvData}
      uiSchema={uiSchema}
      // liveValidate
          showErrorList={false}
          // onChange={data => setNewEnvData(data.formData)}
          onSubmit={data => {
            data = data.formData;
            data.rewardScheme = props.rewards.find(item => item.display_name === data.rewardScheme).value;
            data.project = props.currentProject.id;
            props.onAdd(props.title, data);
          }}
          onError={data => console.log(data)}
    >
      <Button type="submit" color="primary">Create</Button>
    </Form>
  )
}

function EnvCreator(props) {
  return (
    <React.Fragment>
      <h1>Setup New Environment</h1>
      <ComponentWithResources definition={{rewards: new URL('environments/', props.apiUrls.drugexRoot)}} method="OPTIONS">
        {
          (isLoaded, data) => isLoaded ? <EnvCreatorForm {...props} rewards={data.rewards.actions.POST.rewardScheme.choices}/> : "Fetching reward options..."
        }
      </ComponentWithResources>
    </React.Fragment>
  )
}

function ScorerForm(props) {
  const methods_ids = props.methods.map(item => item.id);
  const modifier_ids = props.modifiers.map(item => item.id);
  const schema = {
    type: "object",
    properties: {
      name : {type: "string", title: "Name", minLength: 1, default: ""},
      description: {type: "string", title: "Description", default: ""},
      method: {type: "integer", title: "Method", default: methods_ids[0], enum: methods_ids, items: props.methods},
      modifier: {type: "integer", title: "Modifier", default: modifier_ids[0], enum: modifier_ids, items: props.modifiers},
      threshold: {type: "number", title: "Threshold", default: 0.5}
    }
  }
  const ItemField = (props) => {
    return (
      <FormGroup>
        <Label>{props.schema.title}</Label>
        <Input type="select"
               id={props.id}
               required={props.required}
               onChange={(event) => props.onChange(event.target.value)}>
          {
            props.schema.items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
          }
        </Input>
      </FormGroup>
    );
  };
  const uiSchema = {
    method: {
      "ui:widget": ItemField
    },
    modifier: {
      "ui:widget": ItemField
    }
  }
  return (
    <Form
      showErrorList={false}
      schema={schema}
      uiSchema={uiSchema}
      onError={data => console.log(data)}
      onSubmit={(data) => {
        data = data.formData;
        data.environment = props.environment.id;
        data.project = props.currentProject.id;
        props.onAdd(data);
      }}
    >
      <Button type="submit" color="primary">Add</Button>
    </Form>
  )
}

function ScorersList(props) {
  return (
    <UncontrolledAccordion
      open={false}
      stayOpen
    >
      {
        props.scorers.map(item => (
          <AccordionItem key={item.id}>
            <AccordionHeader targetId={String(item.id)}>
              {item.name}
            </AccordionHeader>
            <AccordionBody accordionId={String(item.id)}>
              <p>
                <strong>Method: </strong>{props.methods.find(method => item.method === method.id).name}
              </p>
              <p>
                <strong>Modifier: </strong>{props.modifiers.find(mod => item.modifier === mod.id).name}
              </p>
              <p>
                {item.description}
              </p>
              <Button color="danger" onClick={() => props.onDelete(item)}>Delete</Button>
            </AccordionBody>
          </AccordionItem>
        ))
      }
    </UncontrolledAccordion>
  )
}

function ScorerDesigner(props) {
    return (
      <ComponentWithResources definition={
        {
          methods: new URL('scorers/methods/all/', props.apiUrls.drugexRoot),
          modifiers: new URL('scorers/modifiers/all/', props.apiUrls.drugexRoot),
        }
      }>
        {
          (isLoaded, data) => isLoaded ? (
            <React.Fragment>
              <h3>{props.title}</h3>
              <div className="scorers-list">
                <ScorersList {...props} methods={data.methods} modifiers={data.modifiers} onDelete={(data) => props.onDelete(props.title, data)}/>
              </div>
              <hr />
              <h3>Add Scorer</h3>
              <div className="scorers-form">
                <ScorerForm {...props} methods={data.methods} modifiers={data.modifiers} onAdd={(data) => props.onAdd(props.title, data)}/>
              </div>
            </React.Fragment>
          ) : "Fetching options..."
        }
      </ComponentWithResources>
    )
}

function Scorers(props) {
  return (
    <ComponentWithObjects
      {...props}
      commitObjects={true}
      objectListURL={new URL('scorers/', props.apiUrls.drugexRoot)}
      emptyClassName="Scorers"
      render={(data, x, handleAdd, handleDelete) => (
        <ScorerDesigner {...props} title="Scorers" scorers={data.Scorers} onAdd={handleAdd} onDelete={handleDelete}/>
      )}
    />
  )
}

function EnvCard(props) {
  const environment = props.environment;
  const tabs = [
    {
      title: "Info",
      renderedComponent: props => (
        <React.Fragment>
          <ProjectItemSubTitle item={environment}/>
          <em>Reward Scheme: </em>{environment.rewardScheme}<br/>
          {environment.description}
        </React.Fragment>
      )
    },
    {
      title: "Scorers",
      renderedComponent: props => (
        <Scorers {...props}/>
      )
    }
  ];
  return (
    <Card
      style={{
        width: '45%',
        display: 'inline-block',
        marginRight: "1em"
      }}
    >
      <CardHeader>
        {environment.name}
      </CardHeader>
      <CardBody>
        <TabWidget
          {...props}
          tabs={tabs}
        />
      </CardBody>
      <CardFooter>
        <Button color="danger" onClick={() => props.onDelete(environment)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

function Envs(props) {
  return (
    <React.Fragment>
      {props.environments.length > 0 ? <h1>{props.title}</h1> : null}
      <div className="environment-list">
        {
          props.environments.map(item => <EnvCard {...props} key={item.id} environment={item} onDelete={(item) => props.onDelete(props.title, item)}/>)
        }
      </div>
      <div className="environment-creator">
        <EnvCreator {...props}/>
      </div>
    </React.Fragment>
  )
}

export default function EnvironmentPage (props) {

  return (
    <ComponentWithObjects
      {...props}
      commitObjects={true}
      objectListURL={new URL('environments/', props.apiUrls.drugexRoot)}
      emptyClassName="Environments"
      render={(data, x, handleAdd, handleDelete) => (
        <Envs {...props} title="Environments" environments={data.Environments} onAdd={handleAdd} onDelete={handleDelete}/>
      )}
    />
  )
}