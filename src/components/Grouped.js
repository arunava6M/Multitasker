import { createUseStyles } from "react-jss";
import Proptypes from "prop-types";

const useStyles = createUseStyles({
  styles: {
    display: "flex",
    alignItems: ({ alignItems }) => alignItems,
    flexDirection: ({flexDirection}) => flexDirection,
    justifyContent: "space-around",
  },
});

const Grouped = ({ children, alignItems, flexDirection }) => {
  const classes = useStyles({ alignItems, flexDirection });
  return <div className={classes.styles}>{children}</div>;
};

Grouped.propTypes = {
  chidlren: Proptypes.node.isRequired,
  flexDirection: Proptypes.string,
  alignItems: Proptypes.string,
};

Grouped.defaultProps = {
  alignItems: "center",
  flexDirection: "row"
};
export default Grouped;
