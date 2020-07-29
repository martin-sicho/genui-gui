import React from "react";
import { CardHeader } from 'reactstrap';
import NewMolSetFormRenderer from './NewMolSetFormRenderer';

class GenericNewMolSetCard extends React.Component {

    postFormData = (data, isMultiPart) => {
        fetch(
          this.props.molsetListUrl
          , {
            method: 'POST'
            , body: isMultiPart ? data : JSON.stringify(data)
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
        <NewMolSetFormRenderer {...this.props} handleCreate={this.postFormData}/>
      </React.Fragment>
    )
  }
}

export default GenericNewMolSetCard;