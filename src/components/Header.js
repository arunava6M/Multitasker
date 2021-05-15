import { createUseStyles } from "react-jss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { icons } from "../icons";
import Box from "./Box";
import Grouped from "./Grouped";
import Text from "./Text";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  headerContainer: {
    fontSize: 18,
    fontWeight: 500,
    height: ({ isSmallScreen }) => (isSmallScreen ? "90px" : "30px"),
    display: "flex",
    flexDirection: ({ isSmallScreen }) => (isSmallScreen ? "column" : "row"),
    justifyContent: "space-between",
    alignItems: ({ isSmallScreen }) => (isSmallScreen ? "left" : "center"),
    padding: "10px",
  },
  icon: {
    fontSize: 34,
    color: "#3ca5c2",
    paddingRight: ({ isSmallScreen }) => !isSmallScreen && "50px",
    paddingLeft: "50px",
  },
  search: {
    width: ({ isSmallScreen }) => (isSmallScreen ? "100%" : "40%"),
    border: "3px solid #00B4CC",
    padding: "5px",
    height: "30px",
    borderRadius: "5px 0 0 5px",
    outline: "none",
    color: "#8c9196",
  },

  image: {
    height: "30px",
    borderRadius: "50%",
    margin: [0, "10px"],
  },
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

const Header = ({ history, isSmallScreen, signOut }) => {
  const classes = useStyles({ isSmallScreen });
  const user = useContext(UserContext);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user.email) {
      console.log(user);
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

  if (!user.email) return null;
  const handleSignOut = () => {
    history.push("/");
    console.log(history);
    signOut();
  };
  return (
    <div className={classes.headerContainer}>
      <Grouped>
        {headerLinks.map(({ name, icon, link }) => (
          <Box variant="button" onClick={() => console.log("inside")}>
            <Text variant="medium">{icons[icon]}</Text>&nbsp;&nbsp;
            <Text variant="small">{name}</Text>
          </Box>
        ))}
      </Grouped>
      <Grouped>
        <Text variant="small" color="#ffc799">
          {userData.displayName}
        </Text>
        <img className={classes.image} src={userData.photoURL} alt="DP" />
        <Link to="/">
          <Box variant="button" onClick={signOut} bgColor="#f7aba6">
            {icons["signOut"]}
          </Box>
        </Link>
      </Grouped>
    </div>
  );
};

export default Header;
