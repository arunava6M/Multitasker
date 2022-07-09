import { createUseStyles } from "react-jss";
import Proptypes from "prop-types";

const useStyles = createUseStyles({
  styles: {
    display: "flex",
    alignItems: ({ alignItems }) => alignItems,
    flexDirection: ({flexDirection}) => flexDirection,
    justifyContent: "space-around",
    width: ({width}) => width,
  },
});

const Grouped = ({ children, alignItems, flexDirection, width, ...rest }) => {
  const classes = useStyles({ alignItems, flexDirection, width });
  return <div className={classes.styles} {...rest}>{children}</div>;
};

Grouped.propTypes = {
  children: Proptypes.node.isRequired,
  flexDirection: Proptypes.string,
  alignItems: Proptypes.string,
  width: Proptypes.string,
};

Grouped.defaultProps = {
  alignItems: "center",
  flexDirection: "row",
  width: "auto"
};
export default Grouped;
