// LatestBlock.js

import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  latestBlockWrapper: {
    position: "relative",
    display: "flex",
    padding: "1.25rem .75rem 0",
    fontSize: "1.25rem",
    fontWeight: 700,
  },
  blockImg: {
    paddingRight: ".25rem",
    overflow: "hidden",
  },
});

export default ({ blockNumber }) => {
  const style = useStyles();

  return (
    <div className={style.latestBlockWrapper}>
      <span className={style.blockImg}>{"\u27e5\u27e5\u27e5"}</span>
      <span>{`LatestBlock:  [${blockNumber || "..."}]`}</span>
    </div>
  );
};
