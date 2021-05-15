import { createUseStyles } from "react-jss";
import { MdFiberManualRecord } from "react-icons/md";

const useStyles = createUseStyles({
  buttonbaseSyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    margin: "5px",
    width: ({ width }) => width || "30px",
    height: ({ height }) => height || "30px",
    color: ({ bordered }) => (bordered ? "#eb762b" : "#fff"),
    transition: "0.2s",
    cursor: "pointer",
    borderRadius: "15px",
    border: ({ bordered }) => bordered && "2px solid #eb762b",

    "&:hover": {
      backgroundColor: ({ bgColor }) => bgColor || "#fff",
      color: "black",
      border: "none",
    },
  },
});

const Button = ({
  variant,
  onClick,
  children,
  width,
  height,
  bordered,
  bgColor,
}) => {
  const classes = useStyles({ width, height, bordered, bgColor });

  return (
    <button className={classes.buttonbaseSyles} onClick={onClick}>
      {variant === "bullet" && <MdFiberManualRecord />}
      {children}
    </button>
  );
};

export default Button;
