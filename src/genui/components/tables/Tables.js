import key from 'weak-key';
import React from 'react';
import { resolve } from '../../utils';

// FIXME: this should be only one component that merges all of the functionality below to one

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
      <tr key={key({dummy : item})}>
        <th scope="row">{props.parseRowHeader ? props.parseRowHeader(resolve(rowHeaderProp, item)) : resolve(rowHeaderProp, item)}</th>
        {
          dataProps.map(dprop => {
            const resolved = resolve(dprop, item);
            return (
              <td key={key({dummy : resolved})}>
                {props.conversion ? props.conversion(resolved) : resolved.toString()}
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
          {header.map(item => (<th key={item}>{props.parseHeaderItem ? props.parseHeaderItem(item) : item}</th>))}
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