import { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

import { db } from "../firebase";
import Box from "./Box";
import Button from "./Button";
import Text from "./Text";

const userBoxStyles = createUseStyles({
  image: {
    height: "35px",
    width: "35px",
    borderRadius: "50%",
  },
  customBlock: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const UserBox = ({ email, onClick, onlyPic = false }) => {
  const classes = userBoxStyles();
  const [user, setUser] = useState({});
  useEffect(() => {
    db.collection("users")
      .doc(email)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });
  }, [email]);

  const Renderer = (props) =>
    onClick ? (
      <Button onClick={onClick} color="black" {...props} />
    ) : (
      <Box height="1px" alignItems="center" {...props} />
    );

  if (onlyPic) {
    return (
      <div className={classes.customBlock}>
        <img className={classes.image} src={user.photoURL} alt="DP" />
      </div>
    );
  }

  return (
    <Renderer width="200px">
      <img className={classes.image} src={user.photoURL} alt="DP" />
      &nbsp;&nbsp;&nbsp;
      <Text variant="small" color="#fff">{user.displayName}</Text>
    </Renderer>
  );
};

export default UserBox;
