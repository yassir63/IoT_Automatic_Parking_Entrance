import React, { useEffect, useState } from 'react';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";
import ChapitreBox from './ChapitreBox';

export default function DragDropArea({items,actions,onChange}) {
  

  // const onChange=(sourceId, sourceIndex, targetIndex, targetId)=> {
  //   console.log('change');
  //   const result = swap(items, sourceIndex, targetIndex);
  //   return setItems(result);
  // }
  
  const rowHeight=200
  const boxesPerRow=4
  const gridZoneHeight=rowHeight * Math.ceil(items.length / boxesPerRow)
  // const [gridZoneHeight,setGridZoneHeight]=useState(0)
  console.log(gridZoneHeight);
  // useEffect(() => {
  //   setGridZoneHeight(rowHeight * Math.ceil(items.length / boxesPerRow))
  // }, [items])
  
  return (
    <GridContextProvider onChange={onChange}>
      <div className="flex w-full  m-auto my-1">
        <GridDropZone
          className={`rounded-lg flex-1 mx-3`}
          id="gridzone1"
          boxesPerRow={boxesPerRow}
          rowHeight={rowHeight}
          style={{height:`${gridZoneHeight}px`}}
        >
          {items.map(item => (
            <GridItem key={item.id} >
              <ChapitreBox chapitre={item} actions={actions}/>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
};

