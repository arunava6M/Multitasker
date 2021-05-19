import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => {
  const commonStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    margin: "10px",
  };

  return {
    container_wrapper: {
      ...commonStyle,

      justifyContent: ({ justify }) => justify,
      alignItems: ({ alignItems }) => alignItems,
      height: ({ height }) => height || "80vh",
      width: ({ width }) => width || "70vw",
      maxWidth: ({ maxWidth }) => maxWidth,
      borderRadius: "30px",
      padding: ({ padding }) => padding || "10px",
      backgroundColor: ({ transparent, primary }) =>
        !transparent && (primary ? "#eb762b" : "#ede6e1"),
      backgroundImage: ({ orangy }) =>
        orangy && "linear-gradient(to bottom right, #eb762b 10%, #c2581f)",
      boxShadow: ({ shadow }) =>
        shadow && "-1px 93px 73px -53px rgba(0,0,0,0.53)",
    },
  };
});

const Box = ({
  children,
  variant = "wrapper",
  maxWidth,
  height,
  shadow,
  width,
  orangy,
  transparent,
  alignItems,
  padding,
  justify,
  key,
}) => {
  const classes = useStyles({
    height,
    shadow,
    width,
    maxWidth,
    orangy,
    transparent,
    alignItems,
    padding,
    justify,
  });
  return (
    <div key={key} className={classes[`container_${variant}`]}>
      {children}
    </div>
  );
};

export default Box;
