import React from "react";
import Form from "@rjsf/bootstrap-4";
import { ComponentWithObjects } from '../../../../../genui';
import { Button, Col, Container, Input, Label, Row } from 'reactstrap';
import { Chart } from 'react-chartjs-2';
import CardGrid from './CardGrid';

function ModifierChart(props) {
  const datasets = [
    {
      label: props.title,
      fill: false,
      data: props.outputs,
      backgroundColor: '#36a2eb',
      borderColor: '#36a2eb'
    }
  ];
  const data = {
    labels: props.inputs,
    datasets: datasets
  };
  return (
    <Chart
      data={data}
      type='line'
      options={{
        scales: {
          x: {
            title: {
              display: true,
              text: 'Example Input'
            },
          },
          y: {
            title: {
              display: true,
              text: 'Modified Score'
            }
          }
        },
        title: {
          display: true,
          text: 'Modifier Values on Example Inputs'
        },
        elements: {
          point:{
            radius: 0
          }
        }
      }
      }
    />
  );
}

function TestChart(props) {
  const [outputs, setOutputs] = React.useState(null);
  const [inputs, setInputs] = React.useState([]);
  const fillInputs = (min, max, step) => {
    const new_inputs = []
    let i = min
    while (i <= max) {
      i = i+step;
      new_inputs.push(i);
    }
    setInputs(new_inputs);
  };
  React.useEffect(() => {
    fillInputs(props.min, props.max, props.step)
  }, [props.min, props.max, props.step]);
  React.useEffect(() => {
    fetch(new URL("test/", props.url), {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({inputs: inputs, params: props.data}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(
      (data) => {
        setOutputs(data.results)
      }
    ).catch(
      (error) => console.log(error)
    )
  }, [inputs, props.data, props.url])
  return (
    <div className="modifier-test-chart">
      <ModifierChart inputs={inputs} outputs={outputs} title={props.title}/>
    </div>
  )
}

function ModifierGrid(props) {
  return (
    <div className="modifier-grid">
      <h2>{props.title}</h2>
      <CardGrid
        data={props.data}
        itemDataComponent={props.itemDataComponent}
        onDelete={(item) => props.onDelete(props.title, item)}
      />
    </div>
  )
}

function ModifierForm(props) {
  const [useSliders, setUseSliders] = React.useState(true);
  const initialData = props.initialData;
  initialData.name = "";
  const [data, setData] = React.useState(initialData);
  let [sliderMin, setSliderMin] = React.useState(props.sliderMin);
  let [sliderMax, setSliderMax] = React.useState(props.sliderMax);
  let [sliderStep, setSliderStep] = React.useState(props.sliderStep);
  // if (sliderMax <= sliderMin) {
  //   sliderMax = -1 * sliderMin - 1;
  // }
  // if (!sliderStep || sliderStep <= 0) {
  //   sliderStep = 1;
  // }

  const schema = {
    type: "object",
    properties: {
      name : {type: "string", title: "Name", minLength: 1},
    }
  };
  const uiSchema = props.uiSchema ? props.uiSchema : {};
  for (const [key, value] of Object.entries(props.schema)) {
    schema.properties[key] = value;
    schema.properties[key].default = props.initialData[key];
    if (value.type === "number") {
      schema.properties[key].minimum = props.sliderMin;
      schema.properties[key].maximum = props.sliderMax;
      uiSchema[key] = {
        "ui:widget" : useSliders ? 'range' :'updown'
      };
    }
  }

  const inlineStyle = {
    display: 'inline'
  }
  const setInlineWidthStyle = width => ({display: 'inline', width: width});
  return (
    <div className="modifier-specifier">
      <Container fluid>
        <Row>
          <Col xs="2">
            <Label for="useSliders">Sliders</Label>
            <Input
              name="useSliders"
              type="checkbox"
              checked={useSliders}
              onChange={() => setUseSliders(!useSliders)}
            />
          </Col>
          {
            useSliders ? (
              <React.Fragment>
                <Col xs="2">
                  <Label for="min" style={inlineStyle}>Min</Label>
                  <Input
                    style={setInlineWidthStyle("60%")}
                    name="min"
                    type="number"
                    value={sliderMin}
                    onChange={(e) => setSliderMin(Number(e.target.value))}
                  />
                </Col>
                <Col xs="2">
                  <Label for="max" style={inlineStyle}>Max</Label>
                  <Input
                    style={setInlineWidthStyle("60%")}
                    name="max"
                    type="number"
                    value={sliderMax}
                    onChange={(e) => setSliderMax(Number(e.target.value))}
                  />
                </Col>
                <Col xs="2">
                  <Label for="step" style={inlineStyle}>Step</Label>
                  <Input
                    style={setInlineWidthStyle("60%")}
                    name="step"
                    type="number"
                    value={sliderStep}
                    onChange={(e) => setSliderStep(Number(e.target.value))}
                  />
                </Col>
              </React.Fragment>
            ) : null
          }
        </Row>
        <Row>
          <Col xs="6"><hr/></Col>
        </Row>
        <Row>
          <Col xs="6">
            <Form schema={schema}
                  formData={data}
                  uiSchema={uiSchema}
              // liveValidate
                  showErrorList={false}
                  onChange={data => setData(data.formData)}
                  onSubmit={data => {
                    data = data.formData;
                    data.project = props.currentProject.id;
                    props.onAdd(props.title, data);
                  }}
                  onError={data => console.log(data)}
            >
              <Button type="submit" color="primary">Create</Button>
            </Form>
          </Col>
          <Col xs="6">
            <TestChart
              data={data}
              url={props.url}
              min={sliderMin}
              max={sliderMax}
              step={sliderStep}
              title={props.title}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

function Clipped(props) {
  const initialData = {
    upper: 10,
    lower: -10,
    high: 1,
    low: 0,
    smooth: false,
  }
  const schema = {
    upper: {type: "number", title: "Upper"},
    lower: {type: "number", title: "Lower"},
    high: {type: "number", title: "High"},
    low: {type: "number", title: "Low"},
    smooth: {type: "boolean", title: "Smooth", enum: [true, false]}
  };
  const uiSchema = {
    smooth : {
      "ui:widget": "select"
    }
  }

  return (
    <React.Fragment>
      <ModifierGrid {...props} itemDataComponent={
        (props) => (
          <React.Fragment>
            <em>Upper:</em> {props.item.upper}<br/>
            <em>Lower:</em> {props.item.lower}<br/>
            <em>High:</em> {props.item.high}<br/>
            <em>Low:</em> {props.item.low}<br/>
            <em>Smooth:</em> {props.item.smooth ? "Yes" : "No"}
          </React.Fragment>
        )
      }/>
      <ModifierForm {...props} initialData={initialData} schema={schema} uiSchema={uiSchema} sliderStep={1} sliderMin={-20} sliderMax={20}/>
    </React.Fragment>
  );
}

function Hump(props) {
  const initialData = {
    upper: 5,
    lower: -5,
    sigma: 0.5
  }
  const schema = {
    upper: {type: "number", title: "Upper"},
    lower: {type: "number", title: "Lower"},
    sigma: {type: "number", title: "Sigma", multipleOf: 0.1},
  };

  return (
    <React.Fragment>
      <ModifierGrid {...props} itemDataComponent={
        (props) => (
          <React.Fragment>
            <em>Upper:</em> {props.item.upper}<br/>
            <em>Lower:</em> {props.item.lower}<br/>
            <em>Sigma:</em> {props.item.sigma}<br/>
          </React.Fragment>
        )
      }/>
      <ModifierForm {...props} initialData={initialData} schema={schema} sliderStep={0.1} sliderMin={-10} sliderMax={10}/>
    </React.Fragment>
  );
}

export default function Modifiers(props) {
  const prefix_modifiers = 'scorers/modifiers';
  const modifier_info = [
    {
      url: new URL(`${prefix_modifiers}/clipped/`, props.apiUrls.drugexRoot),
      title: "Clipped Scores",
      component: Clipped
    },
    {
      url: new URL(`${prefix_modifiers}/hump/`, props.apiUrls.drugexRoot),
      title: "Smooth Humps",
      component: Hump
    }
  ];

  return (
    <div className="modifier-methods">
      {
        modifier_info.map(item => (
          <React.Fragment key={item.title}>
            <ComponentWithObjects
              {...props}
              commitObjects={true}
              objectListURL={item.url}
              emptyClassName={item.title}
              render={(data, x, handleAdd, handleDelete, requestUpdate) => <item.component {...props} {...item} url={item.url} data={data[item.title]} updateData={requestUpdate} onAdd={handleAdd} onDelete={handleDelete}/>}
            /><br/><hr/>
          </React.Fragment>
        ))
      }
    </div>
  )
}