import React from 'react';
import { GenericMolSetCard, MolsetActivitiesSummary, MolsInMolSetList, GenericInfo } from '../../../../genui';
import { AssayName, ChEMBLID, Relation, TargetName } from './ActivityFields';
import key from "weak-key";

function MolsStats(props) {
  return (
      <React.Fragment>
        <h4>Compounds</h4>
        <p>Unique in Total: {props.moleculesCount}</p>
        <h4>Associated Targets</h4>
        <ul>
          {
            props.molset.targets.map(
                target => (
                    <li key={target.targetID}>
                      <a rel="noopener noreferrer" href={`https://www.ebi.ac.uk/chembl/target_report_card/${target.targetID}/`} target="_blank">{target.targetID}</a> (<a rel="noopener noreferrer" href={`https://www.ebi.ac.uk/chembl/g/#browse/activities/filter/target_chembl_id:${target.targetID}`} target="_blank">activities overview</a>)
                    </li>
                )
            )
          }
        </ul>
      </React.Fragment>
  )
}

function ChEMBLCard(props) {
  const taskErrorClassToComponent = {
    "<class 'genui.compounds.initializers.exceptions.InconsistentIdentifiersException'>" : props => {
      console.log(props.error.data);
      return (
          <React.Fragment>
            {props.error.messages.original.map(message => <span key={key({dummy: message})}>{message}</span>)}
          </React.Fragment>
      )
    }
  };

  const tabs = [
    {
      title : "Info",
      renderedComponent : (props) => <GenericInfo {...props} customMolStats={MolsStats} taskErrorClassToComponent={taskErrorClassToComponent}/>,
    },
    {
      title: "Compounds",
      renderedComponent : (props) => (
        <MolsInMolSetList
          {...props}
          showInfo={true}
          extraActivityFields={
            [
              {
                dataItems: ["extraArgs.relation"],
                propNames: ["relation"],
                displayName: "Relation",
                component: Relation,
                className: "ChEMBLActivity"
              },
              {
                dataItems: ["extraArgs.assay"],
                propNames: ["assayID"],
                displayName: "Assay",
                component: AssayName,
                className: "ChEMBLActivity"
              },
              {
                dataItems: ["extraArgs.target"],
                propNames: ["targetID"],
                displayName: "Target",
                component: TargetName,
                className: "ChEMBLActivity"
              },
            ]
          }
          extraInfoFields={
            [
              {
                dataItems: ["extraArgs.chemblID"],
                propNames: ["compoundID"],
                displayName: "ChEMBL ID",
                component: ChEMBLID,
                className: "ChEMBLMolecule"
              }
            ]
          }
        />)
    },
    {
      title: "Activities",
      renderedComponent: props => <MolsetActivitiesSummary {...props} selectable={false}/>
    }
  ];

  return (
    <GenericMolSetCard {...props} tabs={tabs}/>
  )
}

export default ChEMBLCard;