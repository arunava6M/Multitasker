import { createUseStyles } from "react-jss";
import { useState } from "react";
import { icons } from "../icons";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    width: "100%",
  },
  textArea: {
    border: "0",
    fontWeight: "600",
    fontSize: "12px",
    width: "100%",
    background: "none",
    color: '#fff',

    "&:focus": {
      outline: "none",
    },

    "&::-webkit-scrollbar": {
      width: "0.5em",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkGrey",
      borderRadius: "30px",
      outline: "none",
      cursor: "pointer",
    },

    "&::-webkit-resizer": {
      display: "none",
    },
  },
  button: {
    height: "15px",
    minWidth: "15px",
    borderRadius: "50%",
    backgroundColor: "inherit",
    color: "red",
    padding: "2px",
    border: "none",
    cursor: "pointer",
    visibility: ({ hovered }) => !hovered && "hidden",
  },
});

const TitleHeader = ({
  hovered,
  handleChange,
  value,
  handleDelete,
  placeholder,
}) => {
  const classes = useStyles({ hovered });
  return (
    <div className={classes.header}>
      <textarea
        className={classes.textArea}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      {handleDelete && (
        <button className={classes.button} onClick={handleDelete}>
          {icons["close"]}
        </button>
      )}
    </div>
  );
};

export default TitleHeader;
