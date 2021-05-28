import React from "react";
import { ResponsiveGrid } from '../../index';
import { Card } from 'reactstrap';

class GenericMolSetGrid extends React.Component {

  constructor(props) {
    super(props);

    this.cardComponent = this.props.cardComponent;
    this.newCardComponent = this.props.newCardComponent;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.molsets.length !== nextProps.molsets.length;
  }

  render() {
    const molsets = this.props.molsets;
    const headingText = this.props.headingText;

    const existing_cards_settings = molsets.map(molset => ({
      id : molset.id,
      h : {"md" : 9, "sm" : 6},
      w : {"md" : 1, "sm" : 1},
      minH : {"md" : 3, "sm" : 3},
      data : molset
    }));
    const new_card_settings = {
      id : "new-mol-set",
      h : {"md" : 9, "sm" : 6},
      w : {"md" : 1, "sm" : 1},
      minH : {"md" : 3, "sm" : 3},
      data : {}
    };
    let card_settings = [];
    if (this.props.selectedNewClass === this.props.currentMolsetClass) {
      card_settings.push(new_card_settings);
    }
    card_settings = card_settings.concat(existing_cards_settings)


    const CardComponent = this.cardComponent;
    const NewCardComponent = this.newCardComponent;

    let cards = [];
    if (this.props.selectedNewClass === this.props.currentMolsetClass) {
      cards.push(
          (
              <Card key={new_card_settings.id} id={new_card_settings.id}>
                <NewCardComponent {...this.props} handleCreateNew={this.props.handleAddMolSet}/>
              </Card>
          )
      )
    }
    cards = cards.concat(existing_cards_settings.map(
        item => (
            <Card key={item.id.toString()}>
              <CardComponent
                  {...this.props}
                  molset={item.data}
              />
            </Card>
        )
    ))

    if (cards.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <h2>{headingText ? headingText : this.props.currentMolsetClass}</h2>
        {/*<hr/>*/}
        <ResponsiveGrid
          items={card_settings}
          rowHeight={75}
          mdCols={2}
          smCols={1}
          gridID={`${this.props.currentMolsetClass}-grid-layout`}
        >
          {
            cards
          }
        </ResponsiveGrid>
      </React.Fragment>
    )
  }
}

export default GenericMolSetGrid;