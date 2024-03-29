import React from "react";
import { Col, ListGroup, ListGroupItem, Row, Table } from 'reactstrap';
import {
  TableDataFromItems,
  TableHeaderFromItems,
  DownloadFile,
  ComponentWithResources,
} from '../../../index';

function FileList(props) {
  const files = props.files;
  const mainFile = files.find(file => file.kind === "main");

  return (
    <Row>
      <Col sm={files.length > 1 ? 6 : 12 }>
        {
          mainFile && mainFile.file ? (
            <React.Fragment>
              <h4>Model File</h4>
              <ListGroup>
                <ListGroupItem>
                  <DownloadFile
                    file={mainFile.file}
                    name={`${mainFile.note}_${mainFile.file.split("_").slice(-1)[0]}`}
                  />
                </ListGroupItem>
              </ListGroup>
            </React.Fragment>
          ) : null
        }
      </Col>
      <Col sm={6}>
        {
          files.length > 1 ? (
            <React.Fragment>
              <h4>Auxiliary Files</h4>
              <ListGroup>
                {
                  files.map((file) => {
                    if (file.kind === "aux") {
                      return (
                        <ListGroupItem key={file.id}>
                          <DownloadFile
                            file={file.file}
                            name={`${file.note}_${file.file.split("_").slice(-1)[0]}`}
                          />
                        </ListGroupItem>
                      )
                    } else {
                      return null;
                    }
                  })
                }
              </ListGroup>
            </React.Fragment>
          ) : null
        }
      </Col>
    </Row>
  )
}

function ModelFiles(props) {
  return (
      <ComponentWithResources
          definition={{files : new URL(`${props.model.id}/files/`, props.listURL)}}
          updateInterval={5000}
          fetchCondition={() => props.tasksRunning}
      >
        {
          (filesLoaded, files) => {
            return filesLoaded ? <FileList files={files.files}/> : null
          }
        }
      </ComponentWithResources>
  )
}

class ModelInfo extends React.Component {

  constructor(props) {
    super(props);

    this.model = this.props.model;
    const trainingStrategy =  this.model.trainingStrategy;

    this.trainingParams = (trainingStrategy ? [
      {
        name : "Algorithm",
        value : trainingStrategy.algorithm.name
      },
      {
        name : "Parameters",
        value : trainingStrategy.parameters.map((param) => `${param.parameter.name}=${param.value}`).join(";")
      },
      {
        name : "Mode",
        value : trainingStrategy.mode.name
      },
    ] : []).concat(
      this.props.extraTrainingParams ? this.props.extraTrainingParams : []
    );

    const validationStrategy = this.model.validationStrategy;
    this.validationParams = (validationStrategy ? [
      {
        name: "Metrics",
        value: validationStrategy.metrics.map((metric) => `${metric.name}`).join(";")
      }
    ] : []).concat(
      this.props.extraValidationParams ? this.props.extraValidationParams : []
    );
  }

  render() {
    const model = this.model;

    return (
      (<Row>
        <Col sm="12">
          {
            model.description ? (
              <React.Fragment>
                <h4>Description</h4>
                <p>{model.description}</p>
              </React.Fragment>
            ) : null
          }

          {
            this.props.modelData ? (
              <React.Fragment>
                <h4>Model Data</h4>
                <Table size="sm">
                  <TableHeaderFromItems
                    items={["Item", "Value"]}
                  />
                  <TableDataFromItems
                    items={this.props.modelData}
                    dataProps={["value"]}
                    rowHeaderProp="name"
                  />
                </Table>
              </React.Fragment>
            ) : null
          }

          <h4>Training Settings</h4>
          <Table size="sm">
            <TableHeaderFromItems
            items={["Parameter", "Value"]}
            />
            <TableDataFromItems
              items={this.trainingParams}
              dataProps={["value"]}
              rowHeaderProp="name"
            />
          </Table>

          <h4>Validation Settings</h4>
          {
            this.validationParams.length > 0 ? (
              <Table size="sm">
                <TableHeaderFromItems
                  items={["Parameter", "Value"]}
                />
                <TableDataFromItems
                  items={this.validationParams}
                  dataProps={["value"]}
                  rowHeaderProp="name"
                />
              </Table>
            ) : <p>No validation data available for this model.</p>
          }

          <ModelFiles
            {...this.props}
          />
          <br/>

          <h4>Useful API URLs</h4>
          <a href={this.props.modelUrl.toString()} target="_blank" rel="noopener noreferrer">{this.props.modelUrl.toString()}</a>

          {
            this.props.extraInfoComponent ? <this.props.extraInfoComponent {...this.props} /> : null
          }
        </Col>
      </Row>)
    )
  }
}

export default ModelInfo;