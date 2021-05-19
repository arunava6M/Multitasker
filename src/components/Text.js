import { createUseStyles } from "react-jss";
import Proptypes from "prop-types";

const useStyles = createUseStyles(() => {
  const baseStyles = {
    color: ({ color }) => color,
    lineHeight: 1.2,
    fontWeight: ({ bold }) => (bold ? 700 : 400),

    "&: hover": {
      color: ({ hover }) => hover,
      cursor: ({ onClick }) => onClick && "pointer",
    },
  };

  return {
    bigText: {
      ...baseStyles,
      fontSize: "40px",
    },
    regularText: {
      ...baseStyles,
      fontSize: "24px",
    },
    mediumText: {
      ...baseStyles,
      fontSize: "16px",
    },
    smallText: {
      ...baseStyles,
      fontSize: "12px",
    },
  };
});

const Text = ({ children, hover, variant, color, bold, onClick }) => {
  const classes = useStyles({ color, hover, bold, onClick });
  return (
    <div className={classes[`${variant}Text`]} onClick={onClick}>
      {children}
    </div>
  );
};

Text.propTypes = {
  children: Proptypes.node.isRequired,
  variant: Proptypes.oneOf(["small", "medium", "regular", "big"]),
  color: Proptypes.string,
  bold: Proptypes.bool,
  hiver: Proptypes.string,
};

Text.defaultProps = {
  variant: "medium",
  color: "inherit",
  bold: false,
  hover: false,
};

export default Text;
