import { createUseStyles } from "react-jss";
import { useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import Box from "./Box";
import { icons } from "../icons";
import { UserContext } from "../contexts/UserContext";
import Text from "./Text";

const useStyles = createUseStyles({
  style: {
    height: ({ height }) => height,
    width: ({ width }) => width,
  },
  input: {
    outline: "none",
    width: "100%",
    border: "2 solid",
    marginTop: "10px",
    borderRadius: "30px",
    borderColor: "#fff",
    fontFamily: "inherit",
    paddingLeft: "5px",
    height: "30px",
    fontSize: "12px",
    fontWeight: 500,
    background: "none",
    color: "#fff",
    transition: "all .15s ease",
    "&:focus": {
      outline: "none",
      stroke: "#fff",
    },
  },
});

const userBoxStyles = createUseStyles({
  image: {
    height: "35px",
    borderRadius: "50%",
  },
});

const UserBox = ({ email, acceptRequest }) => {
  const classes = userBoxStyles();
  const [user, setUser] = useState({});
  db.collection("users")
    .doc(email)
    .onSnapshot((doc) => {
      setUser(doc.data());
    });
  return (
    <Box height="30px" width="200px" alignItems="center">
      <img className={classes.image} src={user.photoURL} alt="DP" />
      &nbsp;&nbsp;&nbsp;
      <Text variant="small">{`${
        user.displayName?.split(" ")[0]
      } sent you a request`}</Text>
      <Text variant="regular" onClick={() => acceptRequest(email)}>
        {icons["ok"]}
      </Text>
    </Box>
  );
};

const Notification = ({ height, width }) => {
  const classes = useStyles({ height, width });
  const [contributeReq, setContributeReq] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    user.email &&
      db
        .collection("contributeTo")
        .doc(user.email)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setContributeReq(doc.data());
          }
        });
  }, [user, setContributeReq]);

  const acceptRequest = (email) => {
    console.log("asdasd");
    db.collection("contributeTo")
      .doc(user.email)
      .update({
        [email]: true,
      });
  };
  return (
    <div className={classes.style}>
      {contributeReq &&
        Object.entries(contributeReq).map(
          (c) =>
            c[1] === "false" && (
              <UserBox acceptRequest={acceptRequest} email={c[0]} />
            )
        )}
    </div>
  );
};

export default Notification;
