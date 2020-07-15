import React from 'react';
import { GenericMolSetCard, MolsetActivitiesSummary, MolsInMolSetList, GenericInfo } from '../../../../genui';

function GeneratedCard(props) {
  const tabs = [
    {
      title : "Info",
      renderedComponent : GenericInfo,
    },
    {
      title : "Structures",
      renderedComponent: (props) => <MolsInMolSetList {...props} showInfo={true}/>,
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

export default GeneratedCard;