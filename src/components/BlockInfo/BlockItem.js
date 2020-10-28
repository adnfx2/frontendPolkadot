// BlockItem.js

import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  blockItem: {
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    alignItems: "center",
    "& .split": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& .small": {
      fontSize: ".8em",
    },
  },
});

export default ({ title, value, className }) => {
  const style = useStyles();
  const noneStr = "----------------";

  return (
    <div className={`${style.blockItem} ${className || ""}`.trim()}>
      <span className="split">{`${title || noneStr}: `}</span>
      <span className="split small">{value || noneStr}</span>
    </div>
  );
};
