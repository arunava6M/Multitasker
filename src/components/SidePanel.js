import { createUseStyles } from "react-jss";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import Box from "./Box";
// import Freesample from "./Freesample.svg";
import Text from "./Text";
import { UserContext } from "../contexts/UserContext";
import Spacing from "./Spacer";
import ContributorPanel from "./ContributorPanel";
import { db } from "../firebase";
import Box from "./Box";
import Notification from "./Notification";
import Grouped from "./Grouped";
import { icons } from "../icons";
// import { icons } from "../icons";
import Login from "../pages/login";
import Button from "./Button";

const useStyles = createUseStyles({
  container: {
    // paddingLeft: "30px",
    height: "100%",
    width: "100%",
    // backgroundColor: '#3a4caa',
  },
  image: {
    height: "40px",
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
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
  }
});

const headerLinks = [
  {
    name: "Dashboard",
    icon: "task",
    link: "/dashboard",
  },
  {
    name: "Contribute",
    icon: "contribute",
    link: "/contribute",
  },
  {
    name: "Dashboard",
    icon: "task",
    link: "/dashboard",
  },
  {
    name: "Contribute",
    icon: "contribute",
    link: "/contribute",
  },
  {
    name: "Dashboard",
    icon: "task",
    link: "/dashboard",
  },
  {
    name: "Contribute",
    icon: "contribute",
    link: "/contribute",
  },
];

const SidePanel = ({signIn}) => {
  const user = useContext(UserContext);
  const classes = useStyles({user});
  const [userData, setUserData] = useState({});
  const history = useHistory();

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

  console.log(userData)
  return (
    <div className={classes.container}>
      {/* <Spacing height="15px" />
      <Text variant="medium" color="white">
        Multitasker
      </Text> */}
      <Spacing height="30px" />
      {user.email && (
        <>
          <div className={classes.userContainer} >
            <img className={classes.image} src={userData.photoURL} alt="DP" />
            <Spacing width="10px" />
            <div>
              <Text color="#e8e8e8" variant="small" bold>{userData.firstName} {userData.lastName}</Text>
              <Spacing height="5px" />
              <Text color="#c7c5c5" variant="small">@arun95</Text>
            </div>
          </div>
          <Spacing height="30px" />
          <Grouped flexDirection="column" alignItems= 'flex-start'>
            {headerLinks.map(({ name, icon, link }) => (
              <>
              <Spacing height="25px" />
              <Button color='#696969' height={20} width='100%' key={name} onClick={() => history.push(link)}>
                <Text variant="medium">{icons[icon]}</Text>
                <Spacing width="20px" />
                <Text variant="small">{name}</Text>
              </Button>
              </>
            ))}
          </Grouped>
          {/* <Text color="#ffc799" variant="small">
            Your Contributors
          </Text>
          <ContributorPanel />
          <div className={classes.notification}>
            <Notification />
          </div> */}
        </>
      )}
      {!user.email && <Login signIn={signIn} />}
    </div>
  );
};

export default SidePanel;
