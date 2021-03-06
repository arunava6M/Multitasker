import Box from "../components/Box";
import Button from "../components/Button";
import Text from "../components/Text";
import Spacer from "../components/Spacer";
import { ThemeContext } from "../contexts/ThemeContext";
import { createUseStyles } from "react-jss";
import { useContext } from "react";

const useStyles = createUseStyles({
  signInContainer: {
    marginTop: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Login = ({ signIn }) => {
  const theme = useContext(ThemeContext)
  const classes = useStyles();
  return (
    <div className={classes.signInContainer}>
      <Box
        variant="neumorphic"
        width="300px"
        padding="50px"
        height="100px"
        alignItems="center"
      >
        <Text bold color={theme.primarytext}>
          Sign in with Google to continue
        </Text>
        <Spacer height="30px" />
        <Button variant="neumorphic" onClick={signIn}>
          Sign in
        </Button>
      </Box>
    </div>
  );
};

export default Login;
