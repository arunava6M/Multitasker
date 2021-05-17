import { createUseStyles } from "react-jss";
import Proptypes from "prop-types";

const useStyles = createUseStyles({
  styles: {
    display: "flex",
    alignItems: ({ alignItems }) => alignItems,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const Grouped = ({ children, alignItems }) => {
  const classes = useStyles({ alignItems });
  return <div className={classes.styles}>{children}</div>;
};

Grouped.propTypes = {
  chidlren: Proptypes.node.isRequired,
  alignItems: Proptypes.string,
};

Grouped.defaultProps = {
  alignItems: "center",
};
export default Grouped;
