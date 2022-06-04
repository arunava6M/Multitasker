import Box from "../components/Box";
import Button from "../components/Button";
import Text from "../components/Text";
import Spacer from "../components/Spacer";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  signInContainer: {
    // height: "100%",
    marginTop: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // background: "#ecf0f3",
    
  },
});

const Login = ({ signIn }) => {
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
        <Text bold color="#a5a4bf">
          Sign in with Google to continue{" "}
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
