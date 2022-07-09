import { createUseStyles } from "react-jss";
import { useContext, useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Text from "./Text";
import { UserContext } from "../contexts/UserContext";
import Spacing from "./Spacer";
import ContributorPanel from "./ContributorPanel";
import { db } from "../firebase";
import Box from "./Box";
import Notification from "./Notification";
import Grouped from "./Grouped";
import { icons } from "../icons";
import Login from "../pages/login";
import Button from "./Button";
import { DARK_THEME, LIGHT_THEME } from '../constants/colours';
import { ViewportContext } from "./ViewportProvider";

const useStyles = createUseStyles({
  container: {
    height: "100%",
    width: "100%",
    padding: "0 0 0 30px"
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
  },
  notification: {
    marginLeft: "-100px",
    position: "relative",
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
  },
  mobileSPContainer: {
    height: '350px',
    width: '250px',
    display: (({sidePanelOpen}) => sidePanelOpen ? 'inherit' : 'none')
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
];

const SidePanel = ({signIn, toggleTheme}) => {
  const user = useContext(UserContext);
  const { isSmallScreen } = useContext(ViewportContext)
  const classes = useStyles({user});
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

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

  const changeTheme = () => {
    toggleTheme(prevState => {
      if(prevState === DARK_THEME) return LIGHT_THEME
      if(prevState === LIGHT_THEME) return DARK_THEME
    })
  }

  const desktopSidePanel = () => (
    <div className={classes.container}>
      {/* <Spacing height="15px" />
      <Text variant="medium" color="white">
        Multitasker
      </Text> */}
      {/* <button onClick={changeTheme}>Change Theme</button> */}
      <Spacing height="30px" />
      {user.email && (
        <>
          <div className={classes.userContainer} >
            <img className={classes.image} src={userData.photoURL} alt="dp"/>
            <Spacing width="10px" />
            <div>
              <Text color="#e8e8e8" variant="small" bold>{userData.firstName} {userData.lastName}</Text>
              <Spacing height="5px" />
              <Text color="#c7c5c5" variant="small">@arun95</Text>
            </div>
          </div>
          <Spacing height="30px" />
          <Grouped flexDirection="column" alignItems= 'flex-start'>
            {headerLinks.map(({ name, icon, link }, index) => (
              <Fragment key={index}>
                <Spacing height="25px" />
                <Button color='#696969' height={20} width='100%' key={name} onClick={() => navigate(link)}>
                  <Text variant="medium">{icons[icon]}</Text>
                  <Spacing width="20px" />
                  <Text variant="small">{name}</Text>
                </Button>
              </Fragment>
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
  )
  
  return ( isSmallScreen ? <MobileSidePanel /> : desktopSidePanel())
};

const MobileSidePanel = () => {
  const [sidePanelOpen, setSidepanelOpen] = useState(false)
  const classes = useStyles({sidePanelOpen})
  return (
    <>
    <Text onClick={() => setSidepanelOpen(!sidePanelOpen)} variant="large">{icons["ok"]}</Text>
      <div className={classes.mobileSPContainer}>
        
        <div>mobile side panel</div>
      </div>
    </>
  )
}

export default SidePanel;
