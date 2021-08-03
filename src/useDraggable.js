import React, { useState } from "react";
const DRAGGABLE = "DRAGGABLE";
const BAR = "BAR";
function draggable(item, id) {
  return {
    type: DRAGGABLE,
    id,
    data: item,
  };
}
function insertBars(list) {
  let i = 0; // ID

  const newBar = () => {
    return {
      type: BAR,
      id: i++,
    };
  };

  // |A|B|C|
  return [newBar()].concat(
    ...list.map((item) => {
      return [draggable(item, i++), newBar()];
    })
  );
}
function clacChanging(list, dragg, id) {
  // let add = list;
  // console.log(list, {...list});
  list = list.slice();
  //list =[...list]//slice和解构都是获取数组的原始地址

  const draggitem = list[dragg];
  const dir = dragg > id ? -2 : 2;
  const end = dir > 0 ? id - 1 : id + 1;
  for (let i = dragg; i != end; i += dir) {
    list[i] = list[i + dir];
  }
  list[end] = draggitem;

  return list;
}
function useDraggable(list) {
  const [dragList, setDragList] = useState(() => {
    return insertBars(list);
  });
  const [dragOver, setdragover] = useState(null);
  const [dragging, setDragging] = useState(null);
  return {
    dragList,
    createDropperProps: (id) => {
      return {
        dragging,
        dragOver,
        eventHandlers: {
          onDragOver: (e) => {
            e.preventDefault();
            setdragover(id);
          },
          onDragLeave: (e) => {
            e.preventDefault();
            setdragover(null);
          },
          onDrop: (e) => {
            e.preventDefault();
            setdragover(null);
            setDragList((list) => {
              return clacChanging(list, dragging, id);
            });
          },
        },
      };
    },
    createDraggerProps: (id, key) => {
      return {
        id,
        key,
        dragging,
        eventHandlers: {
          onDragStart: () => {
            setDragging(id);
          },
          onDragEnd: () => {
            setDragging(null);
          },
        },
      };
    },
  };
}
export default useDraggable;
