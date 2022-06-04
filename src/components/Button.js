import { createUseStyles } from "react-jss";
import Proptypes from "prop-types";

const useStyles = createUseStyles(() => {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: ({justifyContent}) => justifyContent,
    padding: "10px",
    margin: "5px 0 5px 0",
    cursor: "pointer",
    boxShadow: ({ shadow }) =>
      shadow && "-1px 93px 73px -53px rgba(0,0,0,0.53)",
  };
  return {
    normal_button: {
      ...baseStyles,

      textDecoration: "none",
      width: ({ width }) => width,
      height: ({ height }) => `${height}px`,
      color: ({ color }) => color,
      transition: "0.2s",
      // borderRadius: "15px",
      border: ({ bordered }) => (bordered ? "2px solid #ffc799" : "none"),
      backgroundColor: ({ bg }) => bg,

      "&:hover": {
        color: "#fff",
        border: "none",
        borderRight: '1px solid #fff'
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
    neumorphic_button: {
      ...baseStyles,

      outline: "none",
      border: "none",
      borderRadius: "30px",
      fontWeight: 700,
      background: "#25997f",
      color: "#fff",
      padding: "15px",
      boxShadow: "3px 5px 8px #213183, -3px -8px 8px #596bca",
      transition: "0.3s",

      "&:hover": {
        background: "#86e3cf",
      },
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
  justifyContent
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
  width: Proptypes.string,
  height: Proptypes.number,
  bordered: Proptypes.bool,
  bg: Proptypes.string,
  variant: Proptypes.oneOf(["normal", "text"]),
  color: Proptypes.string,
  shadow: Proptypes.bool,
  justifyContent: Proptypes.string
};

Button.defaultProps = {
  width: "100px",
  height: 40,
  bordered: false,
  bg: "transparent",
  variant: "normal",
  color: "#ffc799",
  shadow: false,
  justifyContent: 'center'
};
export default Button;
