import key from 'weak-key';
import React from 'react';
import { resolve } from '../../utils';

export function TableHeaderFromItems (props) {
  const items = props.items;

  return (
    <thead>
    <tr>
      {items.map(item => (<th key={item}>{item}</th>))}
    </tr>
    </thead>
  )
}

export function TableDataFromItems (props) {
  const items = props.items;
  const dataProps = props.dataProps;
  const rowHeaderProp = props.rowHeaderProp;

  return (
    <tbody>
    {items.map(item => (
      <tr key={key(item)}>
        <th scope="row">{resolve(rowHeaderProp, item)}</th>
        {
          dataProps.map(dprop => {
            const resolved = resolve(dprop, item);
            return (
              <td key={key({dummy : resolved})}>
                {resolved}
              </td>
            )
          })
        }
      </tr>
    ))}
    </tbody>
  )
}

export function TableFromItems(props) {
  const items = props.items;
  const header = Object.keys(items);

  return (
      <React.Fragment>
        <thead>
        <tr>
          {header.map(item => (<th key={item}>{item}</th>))}
        </tr>
        </thead>
        <tbody>
        {items[header[0]].map((item, idx) => {
          return (
              <tr key={item.id}>
                {
                  header.map(headerKey => {
                    const data = items[headerKey][idx];
                    return (
                        <td key={data.id}>
                          {data.value ? data.value : ''}
                        </td>
                    )
                  })
                }
              </tr>
          )
        })}
        </tbody>
      </React.Fragment>
  )
}