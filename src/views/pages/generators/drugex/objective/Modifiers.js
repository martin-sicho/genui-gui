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

function Clipped(props) {
  const [useSliders, setUseSliders] = React.useState(true);
  const [data, setData] = React.useState({
    upper: 10,
    lower: -10,
    high: 1,
    low: 0,
    name: "",
    project: props.currentProject.id
  });
  let [sliderMin, setSliderMin] = React.useState(-20);
  let [sliderMax, setSliderMax] = React.useState(20);
  let [sliderStep, setSliderStep] = React.useState(1);
  if (sliderMax <= sliderMin) {
    sliderMax = -1 * sliderMin - 1;
  }
  if (!sliderStep || sliderStep <= 0) {
    sliderStep = 1;
  }

  const schema = {
    type: "object",
    properties: {
      name : {type: "string", title: "Name", minLength: 1},
      upper: {type: "number", title: "Upper", default: data.upper, multipleOf: sliderStep, minimum: sliderMin, maximum: sliderMax},
      lower: {type: "number", title: "Lower", default: data.lower, multipleOf: sliderStep, minimum: sliderMin, maximum: sliderMax},
      high: {type: "number", title: "High", default: data.high, multipleOf: sliderStep, minimum: sliderMin, maximum: sliderMax},
      low: {type: "number", title: "Low", default: data.low, multipleOf: sliderStep, minimum: sliderMin, maximum: sliderMax}
    }
  };

  const inputType = useSliders ? 'range' :'updown';
  const uiSchema = {
    upper: {
        "ui:widget" : inputType
      },
    lower: {
      "ui:widget" : inputType
    },
    high: {
      "ui:widget" : inputType
    },
    low: {
      "ui:widget" : inputType
    }
  }
  const inlineStyle = {
    display: 'inline'
  }
  const setInlineWidthStyle = width => ({display: 'inline', width: width});
  return (
    <React.Fragment>
      <h2>{props.title}</h2>
      <CardGrid
        data={props.data}
        itemDataComponent={
          (props) => (
            <React.Fragment>
              <em>Upper:</em> {props.item.upper}<br/>
              <em>Lower:</em> {props.item.lower}<br/>
              <em>High:</em> {props.item.high}<br/>
              <em>Low:</em> {props.item.low}
            </React.Fragment>
          )
        }
        onDelete={(item) => props.onDelete(props.title, item)}
      />
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
                    onSubmit={data => props.onAdd(props.title, data.formData)}
                    onError={data => console.log(data)}
              >
                <Button type="submit" color="primary">Create</Button>
              </Form>
            </Col>
            <Col xs="6">
              <TestChart
                data={{
                  upper: data.upper,
                  lower: data.lower,
                  high: data.high,
                  low: data.low}
                }
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
    </React.Fragment>
  );
}

export default function Modifiers(props) {
  const prefix_modifiers = 'scorers/modifiers';
  const modifier_info = [
    {
      url: new URL(`${prefix_modifiers}/clipped/`, props.apiUrls.drugexRoot),
      title: "Clipped Score",
      component: Clipped
    }
  ];

  return (
    <div className="modifier-methods">
      {
        modifier_info.map(item => (
          <ComponentWithObjects
            {...props}
            key={item.title}
            commitObjects={true}
            objectListURL={item.url}
            emptyClassName={item.title}
            render={(data, x, handleAdd, handleDelete, requestUpdate) => <item.component {...props} {...item} url={item.url} data={data[item.title]} updateData={requestUpdate} onAdd={handleAdd} onDelete={handleDelete}/>}
          />
        ))
      }
    </div>
  )
}