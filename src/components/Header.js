import { createUseStyles } from "react-jss";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { icons } from "../icons";
import Grouped from "./Grouped";
import Text from "./Text";
import Button from "./Button";
import { Link } from "react-router-dom";
import Spacing from "./Spacer";
import { ThemeContext } from "../contexts/ThemeContext";

const useStyles = createUseStyles({
  headerContainer: {
    fontSize: 18,
    fontWeight: 500,
    height: ({ isSmallScreen }) => (isSmallScreen ? "90px" : "30px"),
    display: "flex",
    flexDirection: ({ isSmallScreen }) => (isSmallScreen ? "column" : "row"),
    justifyContent: "flex-end",
    alignItems: ({ isSmallScreen }) => (isSmallScreen ? "left" : "center"),
    padding: "20px",
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

const Header = ({ isSmallScreen, signOut }) => {
  const classes = useStyles({ isSmallScreen });
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  if (!user.email) return null;

  return (
    <div className={classes.headerContainer}>
      {/* <Grouped>
        <Button width={50} bordered onClick={signOut}>
            {icons[`${theme.id === 'DARK' ? 'darkThemeIcon' : 'lightThemeIcon'}`]}
        </Button>
        <Text variant="small" color="#ffc799">
          theme
        </Text>
        <Spacing width='20px'/>
        <Link to="/">
          <Button width={50} bordered onClick={signOut}>
            {icons["signOut"]}
          </Button>
        </Link>
      </Grouped> */}
      <Grouped>
        <Text variant="small" color="black">
          Sign out
        </Text>
        <Spacing width="20px" />
        <Link to="/">
          <Button
            width="50px"
            height="50px"
            bg="white"
            onClick={signOut}
            bordered
            color="#ff9f1c"
          >
            {icons["signOut"]}
          </Button>
        </Link>
      </Grouped>
    </div>
  );
};

export default Header;
