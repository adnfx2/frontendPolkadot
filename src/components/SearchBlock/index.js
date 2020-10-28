// SearchBar

import React, { useRef } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  searchBar: {
    display: "flex",
    alignItems: "center",
    height: 40,
  },
  searchInput: {
    boxSizing: "border-box",
    flex: "1 1 0",
    height: "100%",
    padding: ".25rem .25rem .25rem .5rem",
    border: ({ color }) => `.5px solid ${color || "slategray"}`,
    borderRight: "none !important",
    fontSize: ".9rem",
    cursor: ({ disabled }) => (disabled ? "wait" : "auto"),
  },
  searchBtn: {
    height: "100%",
    minWidth: 30,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: ({ color }) => color || "slategray",
    fontWeight: 700,
    cursor: ({ disabled }) => (disabled ? "wait" : "auto"),
    "& .icon": {
      fontSize: "2rem",
      padding: "0 .8rem",
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#999",
    },
  },
});

export default ({ handleSearch, color, disabled = true }) => {
  const style = useStyles({ color, disabled });
  const inputRef = useRef(null);

  const _handler = (e) => {
    const value = inputRef.current.value;
    e.preventDefault();
    handleSearch(value);
  };

  return (
    <form onSubmit={_handler} className={style.searchBar}>
      <input
        ref={inputRef}
        type="text"
        className={style.searchInput}
        placeholder="Search Block by Number / Hash"
        disabled={disabled}
      />
      <button className={style.searchBtn}>
        <span className={"icon"}>{"\u2315"}</span>
      </button>
    </form>
  );
};
