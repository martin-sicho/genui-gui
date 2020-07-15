import React from "react";
import { CardHeader } from 'reactstrap';
import NewMolSetFormRenderer from './NewMolSetFormRenderer';

class GenericNewMolSetCard extends React.Component {

    createMolSetFromFormData = (data) => {
        data.project = this.props.currentProject.id;

        // find out if we have a file in the form data
        // if yes, send a multipart request instead of plain json
        let isMultiPart = false;
        const multipartData = new FormData();
        for (let item in data) {
            if (data.hasOwnProperty(item)) {
                const itemData = data[item];
                if (itemData instanceof File) {
                    isMultiPart = true;
                }
                multipartData.append(item, itemData);
            }
        }
        // multipartData.forEach((item, name) => console.log(name, item));

        fetch(
          this.props.molsetListUrl
          , {
            method: 'POST'
            , body: isMultiPart ? multipartData : JSON.stringify(data)
            , headers: isMultiPart ?
                    undefined :
                    {
                        'Content-Type': 'application/json'
                    },
            credentials: "include",
          }
        ).then(response => response.json())
        .then(data => {
            // console.log(data);
            this.props.handleCreateNew(this.props.currentMolsetClass, data)
          }
        ).catch(
          (e) => console.log(e)
        );
    };

  render() {
    return (
      <React.Fragment>
        <CardHeader>{this.props.cardHeader}</CardHeader>
        <NewMolSetFormRenderer {...this.props} handleCreate={this.createMolSetFromFormData}/>
      </React.Fragment>
    )
  }
}

export default GenericNewMolSetCard;