import { createUseStyles } from "react-jss";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const useStyles = createUseStyles(() => {
  const commonStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    margin: "10px",
    transition: '1s'
  };

  return {
    container_wrapper: {
      ...commonStyle,

      justifyContent: ({ justify }) => justify,
      flexDirection: ({ flexDirection }) => flexDirection,
      alignItems: ({ alignItems }) => alignItems,
      // height: ({ height }) => height || "80vh",
      width: ({ width }) => width || "70vw",
      maxWidth: ({ maxWidth }) => maxWidth,
      borderRadius: "8px",
      padding: ({ padding }) => padding || "10px",
      boxShadow: ({ shadow }) =>
        shadow && "-1px 93px 73px -53px rgba(0,0,0,0.53)",
    },
    container_neumorphic: {
      width: "300px",
      height: "120px",
      padding: "50px 35px 35px 35px",
      borderRadius: "40px",
      background: 'linear-gradient(145deg, #332852, #2b2145)',
      boxShadow:  `32px 32px 64px #231b37,
             -32px -32px 64px #3d2f63`
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
  flexDirection = 'row',
}) => {
  const theme = useContext(ThemeContext)
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
    theme,
    flexDirection
  });
  return (
    <div key={key} className={classes[`container_${variant}`]}>
      {children}
    </div>
  );
};

export default Box;
