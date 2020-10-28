//  Selector
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import AvatarTemplate from "./AvatarTemplate";

const useOptionsStyle = createUseStyles({
  selector: {
    position: "relative",
    color: ({ disabled }) => (disabled ? "#dde" : "#fff"),
    fontSize: "1.1rem",
  },
  selectedOption: {
    display: "flex",
    alignItems: "center",
    borderRadius: "1rem",
    fontSize: "1.5rem",
    fontWeight: "700",
    cursor: ({ disabled }) => (disabled ? "wait" : "pointer"),
  },
  options: {
    position: "absolute",
    marginTop: ".5rem",
    marginLeft: ".5rem",
  },
  option: {
    padding: "0 .3rem",
    borderRadius: ".75rem",
    fontSize: ".8rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "font-size 150ms",
    "&:hover": {
      fontSize: "1rem",
    },
  },
});

const Selector = ({
  selectorHandler,
  defaultValue,
  options,
  disabled = true,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsToggle = () =>
    disabled ? null : setShowOptions((prevState) => !prevState);
  const style = useOptionsStyle({ disabled });

  return (
    <div className={style.selector}>
      <div className={style.selectedOption} onClick={optionsToggle}>
        <AvatarTemplate avatar={defaultValue.logo} value={defaultValue.name} />
        <span>{!showOptions ? "\u25bc" : "\u2718"}</span>
      </div>
      {
        <div className={style.options}>
          {!showOptions
            ? ""
            : options.map((option, i) => {
                const wtf = { backgroundColor: option.color }; // ez styling

                return (
                  <div
                    key={i}
                    style={wtf}
                    className={style.option}
                    onClick={() => selectorHandler(i) || setShowOptions(false)}
                  >
                    <AvatarTemplate
                      value={option.name}
                      avatar={option.logo}
                      color={option.color}
                    />
                  </div>
                );
              })}
        </div>
      }
    </div>
  );
};

export default Selector;
