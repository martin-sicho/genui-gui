import React from 'react';
import { Button, CardBody, CardFooter, CardHeader } from 'reactstrap';
import {ProjectItemSubTitle, TabWidget} from '../../index';

class ModelCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isDeleting : false
    }
  }

  render() {
    const model = this.props.model;
    const modelUrl = new URL(`${model.id}/`, this.props.listURL);

    return (
      <React.Fragment>
        <CardHeader>{model.name}</CardHeader>

        <CardBody className="scrollable">
          <ProjectItemSubTitle
            tasks={this.props.taskInfo.tasksExist ? this.props.tasks : null}
            progressURL={this.props.apiUrls.celeryProgress}
            item={model}
          />
          <TabWidget {...this.props} modelUrl={modelUrl} tabs={this.props.tabs}/>
        </CardBody>

        <CardFooter>
          <Button color="danger" disabled={this.state.isDeleting} onClick={() => {
            this.setState({ isDeleting: true });
            this.props.onModelDelete(this.props.modelClass, model)
          }}>Delete</Button>
        </CardFooter>
      </React.Fragment>
    )
  }
}

export default ModelCard;