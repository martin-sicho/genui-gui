import React from 'react';
import {ComponentWithObjects, PLOTLY_COLORS} from '../../../../genui';
import MapSelect from './MapSelect';

function Maps(props) {
  const defaultMapClass = "Map";
  const molsetColorList = PLOTLY_COLORS;
  return (
    <ComponentWithObjects
      objectListURL={props.apiUrls.mapsRoot}
      emptyClassName={defaultMapClass}
      currentProject={props.currentProject}
      render={
        (mapObjects) => {
          const maps = mapObjects[defaultMapClass];
          return <MapSelect {...props} maps={maps} molsetColorList={molsetColorList}/>
        }
      }
    />
  )
}

export default Maps;
