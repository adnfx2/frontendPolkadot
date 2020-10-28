// AvatarTemplate.js

import { createUseStyles } from "react-jss";
import React from "react";

const useAvatarTStyle = createUseStyles({
  avatarWrapper: {
    display: "flex",
    alignItems: "center",
    padding: ".25rem",
    borderRadius: "1rem",
  },
  avatar: {
    borderRadius: "100%",
    overflow: "hidden",
    "& img": {
      display: "flex",
      alignItems: "center",
      width: 32,
    },
  },
  name: {
    width: 150,
    paddingLeft: "0.5rem",
  },
});

export default ({ avatar, value, className }) => {
  const style = useAvatarTStyle();

  return (
    <div className={`${className || ""} ${style.avatarWrapper}`.trim()}>
      <span className={style.avatar}>
        <img src={avatar} alt={`Logo of ${value}'s network`} />
      </span>
      <span className={style.name}>{value}</span>
    </div>
  );
};
