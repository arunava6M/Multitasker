import { createUseStyles } from "react-jss";
import { useContext, useState, useEffect } from "react";
// import Box from "./Box";
// import Freesample from "./Freesample.svg";
import Text from "./Text";
import { UserContext } from "../contexts/UserContext";
import Spacing from "./Spacer";
import ContributorPanel from "./ContributorPanel";
import { db } from "../firebase";
import Box from "./Box";
import Notification from "./Notification";
// import { icons } from "../icons";
// import Grouped from "./Grouped";

const useStyles = createUseStyles({
  container: {
    paddingLeft: "30px",
    height: "100%",
  },
  image: {
    height: "60px",
    borderRadius: "50%",
  },
  bg: {
    bottom: "50px",
    left: "10px",
    position: "absolute",
    width: "600px",
    height: "600px",
    // backgroundColor: "red",
  },
  notification: {
    marginLeft: "-100px",
    position: "relative",
  },
});
const SidePanel = () => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user.email) {
      db.collection("users")
        .doc(user.email)
        .onSnapshot((doc) => {
          const name = doc.data().displayName.split(" ");
          const tempData = {
            firstName: name[0],
            lastName: name[1],
            ...doc.data(),
          };
          setUserData(tempData);
        });
    }
  }, [setUserData, user]);

  return (
    <div className={classes.container}>
      <Spacing height="15px" />
      <Text variant="medium" color="white">
        Multitasker
      </Text>
      <Spacing height="30px" />
      {user.email && (
        <>
          <img className={classes.image} src={userData.photoURL} alt="DP" />
          <Text color="white" variant="regular">
            Hello
            <br />
            {userData.firstName}
            <br />
            {userData.lastName}
          </Text>
          <Spacing height="30px" />
          <Text color="#ffc799" variant="small">
            Your Contributors
          </Text>
          <ContributorPanel />
        </>
      )}
      <div className={classes.notification}>
        <Notification />
        {/* <Box height="80px" width="200px" shadow>
          <Box height="30px" width="200px" orangy alignItems="center"> */}
        {/* <img className={classes.image} src={user.photoURL} alt="DP" />
            &nbsp;&nbsp;&nbsp; */}
        {/* <Text color="white" variant="small">
              Arunava sent you a request.
            </Text>
          </Box>
        </Box> */}
      </div>
    </div>
  );
};

export default SidePanel;
