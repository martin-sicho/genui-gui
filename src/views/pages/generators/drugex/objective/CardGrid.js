import { Button, Card, CardText, CardTitle } from 'reactstrap';
import React from 'react';

export default function CardGrid(props) {

  return (
    <div className="card-grid">
      {
        props.data.map(item => (
          <Card key={item.id} style={{
            width: '17rem',
            display: 'inline-block',
            marginRight: "1em"
          }} body>
            <CardTitle tag="h3">{item.name}</CardTitle>
            <CardText>
              <props.itemDataComponent item={item}/>
            </CardText>
            <Button color="danger" onClick={() => props.onDelete(item)}>
              Delete
            </Button>
          </Card>
        ))
      }
    </div>
  )
}