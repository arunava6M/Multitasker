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
    boxShadow: ({ shadow }) =>
      shadow && "-1px 93px 73px -53px rgba(0,0,0,0.53)",
  };
  return {
    normal_button: {
      ...baseStyles,

      textDecoration: "none",
      width: ({ width }) => `${width}px`,
      height: ({ height }) => `${height}px`,
      color: ({ color }) => color,
      transition: "0.2s",
      borderRadius: "15px",
      border: ({ bordered }) => (bordered ? "2px solid #ffc799" : "none"),
      backgroundColor: ({ bg }) => bg,

      "&:hover": {
        backgroundColor: "#fff",
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
  bg,
  color,
  shadow,
}) => {
  const classes = useStyles({ width, height, bordered, bg, color, shadow });
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
  bg: Proptypes.string,
  variant: Proptypes.oneOf(["normal", "text"]),
  color: Proptypes.string,
  shadow: Proptypes.bool,
};

Button.defaultProps = {
  width: 100,
  height: 40,
  bordered: false,
  bg: "transparent",
  variant: "normal",
  color: "#ffc799",
  shadow: false,
};
export default Button;
