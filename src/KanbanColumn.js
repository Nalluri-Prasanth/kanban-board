// src/KanbanColumn.js

import React, { useRef } from "react";
import { useDrop } from "react-dnd";

const KanbanColumn = ({ status, changeTaskStatus, children }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card", // Make sure the type matches the one used in useDrag
    drop(item) {
      changeTaskStatus(item.id, status);
    }
  });
  drop(ref);
  return <div ref={ref}> {children}</div>;
};

export default KanbanColumn;
