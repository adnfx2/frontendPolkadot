// BlockInfo

import React from "react";
import { createUseStyles } from "react-jss";
import BlockItem from "./BlockItem";
import noDataSvg from "../../assets/noData.svg";

const useStyles = createUseStyles({
  block: {
    padding: ".5rem",
    borderRadius: 8,
    boxShadow: ({ color }) => `0 0 4px ${color || "slategray"}`,
  },
  blockTitle: {
    padding: ".5rem 0 .75rem",
    marginBottom: ".5rem",
    borderBottom: ({ color }) => `1px solid ${color || "slategray"}`,
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  blockDetails: {
    position: "relative",
  },
  blockItem: {
    padding: ".25rem",
    visibility: ({ showData }) => (showData ? "visible" : "hidden"),
  },
  noBlock: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    display: ({ showData }) => (!showData ? "block" : "none"),
  },
});

export default ({ blockInfo, color }) => {
  const showData = blockInfo.blockNumber ? true : false;
  const style = useStyles({ color, showData });

  return (
    <div className={style.block}>
      <div className={style.blockTitle}>Block Details</div>
      <div className={style.blockDetails}>
        <BlockItem
          title="Block Number"
          value={blockInfo.blockNumber}
          className={style.blockItem}
        />
        <BlockItem
          title="Block Hash"
          value={blockInfo.blockHash}
          className={style.blockItem}
        />
        <BlockItem
          title="Extrinsics Root"
          value={blockInfo.extrinsicsRoot}
          className={style.blockItem}
        />
        <BlockItem
          title="Parent Hash"
          value={blockInfo.parentHash}
          className={style.blockItem}
        />
        <BlockItem
          title="State Root"
          value={blockInfo.stateRoot}
          className={style.blockItem}
        />
        <img className={style.noBlock} src={noDataSvg} alt="no data" />
      </div>
    </div>
  );
};
