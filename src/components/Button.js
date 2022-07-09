import { createUseStyles } from "react-jss";
import Proptypes from "prop-types";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";


const useStyles = createUseStyles(() => {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    textAlign: 'center',
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
      height: ({ height }) => height,
      color: ({ color }) => color,
      transition: "0.2s",
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

      width: ({ width }) => width,
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
      position: 'relative',

      outline: "none",
      // border: "none",
      height: ({height}) => height || '4em',
      width: ({width}) => width || '8em',
      border: '2px #090909 solid',
      borderRadius: "30px",
      fontWeight: 700,
      background: ({bg, theme}) => bg || theme.signIn.signInButtonBg,
      color: "wheat",
      padding: "15px",
      boxShadow: ({theme}) => `inset 2px 2px 0px ${theme.signIn.lightShadow}, inset -2px -2px 0px ${theme.signIn.darkShadow}`,
      transition: "0.3s",
      cursor: "pointer",

      '&:hover': {
        boxShadow: ({theme}) => `2px 2px 5px 0 ${theme.signIn.darkShadow}, -2px -2px 3px 0 ${theme.signIn.lightShadow}`,
      },
      '&:before': {
        position: 'absolute',
        content: '""',
        height: ({height}) => height || '4.4em',
        width: ({width}) => width || '8.4em',
        top: '-6px',
        left: '-5px',
        // transform: 'translate(50%, 50%)',
        borderRadius: 'inherit',
        background: ({theme}) => theme.signIn.signInButtonBgShadow,
        boxShadow: '11px 11px 22px #141414, -11px -11px 22px #525252',
        cursor: "pointer",
      }
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
  justifyContent,
  icon
}) => {
  const theme = useContext(ThemeContext)

  const classes = useStyles({ width, height, bordered, bg, color, shadow, justifyContent, icon, theme });
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
  height: Proptypes.string,
  bordered: Proptypes.bool,
  bg: Proptypes.string,
  variant: Proptypes.oneOf(["normal", "text", "neumorphic"]),
  color: Proptypes.string,
  shadow: Proptypes.bool,
  justifyContent: Proptypes.string
};

Button.defaultProps = {
  width: "100px",
  height: "40px",
  bordered: false,
  variant: "normal",
  color: "#ffc799",
  shadow: false,
  justifyContent: 'center'
};
export default Button;
