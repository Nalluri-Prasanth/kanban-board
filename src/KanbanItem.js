// src/KanbanItem.js

import React, { useRef } from "react";
import { useDrag } from "react-dnd";

const KanbanItem = ({ id, children }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "card", // Make sure the type matches the one used in useDrop
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(ref);
  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
};

export default KanbanItem;
