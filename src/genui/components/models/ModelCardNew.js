import React from 'react';
import { CardBody, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import ModelFormRenderer from './ModelFormRenderer';
import ModelFormCardBody from './ModelFormCardBody';
import FormikModelForm from './FormikModelForm';

class ModelCardNew extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      algorithm : this.props.chosenAlgorithm
    };
  }

  newModelFromFormData = (data) => {
    if (this.props.prePost) {
      data = this.props.prePost(data);
    }
    if (data.hasOwnProperty("modelFile")) {
      data.build = false;
      this.postModelData(data, this.postFiles(data));
    } else {
      data.build = true;
      this.postModelData(data)
    }
  };

  postFiles = (originalFormData) => {
    // console.log(originalFormData);
    return (modelData) => {
      const modelID = modelData.id;

      const datas = [];
      // let nFiles = 0;
      for (let name in originalFormData) {
        if (originalFormData.hasOwnProperty(name)) {
          const data = originalFormData[name];

          if (data instanceof File) {
            // nFiles++;
            let formData = new FormData();
            // TODO: add support for file notes to the form
            if (name === "modelFile") {
              formData.append("kind", "main");
            } else {
              formData.append("kind", "aux");
            }
            formData.append("file", data);
            formData.append("model", modelID);
            if (originalFormData[`${name}_note`]) {
              formData.append("note", originalFormData[`${name}_note`]);
            }

            datas.push(formData);
            // console.log(formData);
          }
        }
      }
      // this.setState({nUploads : nFiles});

      const filesUrl = new URL(`${modelID}/files/`, this.props.listURL);
      datas.forEach((data) => {
        fetch(filesUrl, {
          method: 'POST',
          body: data,
          credentials: "include",
        })
          .then(resp => this.props.handleResponseErrors(resp, "Uploading file failed."))
          // .then(data => {
            // TODO: use this to inform the user about upload progress before elevating the state change to parent with "this.props.handleAddModel"
            // this.setState(prevState => {
            //   prevState.uploads.push(data);
            //   console.log(prevState);
            //   return {
            //     uploads: prevState.uploads,
            //     uploadFinished: prevState.nUploads === prevState.uploads.length,
            //   }
            // })
          // })
          .catch(err => console.log(err)); // TODO: record an error for this file in state
      });

      return modelData;
    }
  };

  postModelData = (data, afterModelPOST) => {
    fetch(
      this.props.listURL
      , {
        method: 'POST'
        , body: JSON.stringify(data)
        , headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
      }
    ).then((data) => this.props.handleResponseErrors(data, "Creating model failed. Data wrong or incomplete?"))
      .then(modelData => {
        if (afterModelPOST) {
          return afterModelPOST(modelData);
        }
        return modelData;
      })
      .then(
        modelData => {
          this.props.handleCreate(this.props.modelClass, modelData); // TODO: check if uploads finished fine before delegating
        }
      ).catch(
      error => console.log(error)
    );
  };

  render() {
    // if (this.state.nUploads > 0 && !this.state.uploadFinished) {
    //   return <div>Uploading files...</div>
    // }

    return (
      this.state.algorithm ? (
        <React.Fragment>
          <CardHeader>Create New {this.state.algorithm.name} Model</CardHeader>
          <ModelFormRenderer
            {...this.props} // all these props will be passed down to the component
            chosenAlgorithm={this.state.algorithm}
            component={props => <ModelFormCardBody {...props} form={this.props.form ? this.props.form : FormikModelForm}/>} // this is what should draw the formik form and pass the renderer props to it
            handleCreate={this.newModelFromFormData} // this is the method used to process the parsed data from the form
            project={this.props.currentProject} // this is required
            formNameSuffix="create" // this is required
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CardHeader>Select Algorithm</CardHeader>
          <CardBody>
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary">Choose Algorithm</DropdownToggle>
              <DropdownMenu>
                {
                  this.props.algorithmChoices.map(item => <DropdownItem key={item.id} onClick={() => this.setState({algorithm: item})}>{item.name}</DropdownItem>)
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </CardBody>
        </React.Fragment>
      )
    )
  }
}

export default ModelCardNew;