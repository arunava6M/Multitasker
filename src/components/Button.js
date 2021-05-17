import { createUseStyles } from "react-jss";
import Proptypes from "prop-types";

const useStyles = createUseStyles(() => {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    margin: "5px",
    cursor: "pointer",
  };
  return {
    normal_button: {
      ...baseStyles,

      textDecoration: "none",
      width: ({ width }) => `${width}px`,
      height: ({ height }) => `${height}px`,
      color: "#ffc799",
      transition: "0.2s",
      borderRadius: "15px",
      border: ({ bordered }) => (bordered ? "2px solid #ffc799" : "none"),
      background: "none",

      "&:hover": {
        backgroundColor: ({ bgColor }) => bgColor,
        color: "black",
        border: "none",
      },
    },

    text_button: {
      ...baseStyles,

      background: "none",
      color: "inherit",
      border: "none",
      padding: 0,
      font: "inherit",
      cursor: "pointer",
      outline: "inherit",
    },
  };
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
    <button className={classes[`${variant}_button`]} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: Proptypes.node.isRequired,
  onClick: Proptypes.func.isRequired,
  width: Proptypes.number,
  height: Proptypes.number,
  bordered: Proptypes.bool,
  bgColor: Proptypes.string,
  variant: Proptypes.oneOf(["normal", "text"]),
};

Button.defaultProps = {
  width: 100,
  height: 40,
  bordered: false,
  bgColor: "#fff",
  variant: "normal",
};
export default Button;
