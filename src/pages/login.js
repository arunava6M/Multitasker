import Box from "../components/Box";
import Button from "../components/Button";
import Text from "../components/Text";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  signInContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Login = ({ signIn }) => {
  const classes = useStyles();
  return (
    <div className={classes.signInContainer}>
      <Box width="300px" padding="50px" height="100px" alignItems="center">
        <Text>Sign in with Google to continue </Text>
        <Button bordered width="100px" height="60px" onClick={signIn}>
          Sign in
        </Button>
      </Box>
    </div>
  );
};

export default Login;
