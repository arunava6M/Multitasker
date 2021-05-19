import { createUseStyles } from "react-jss";
import { useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import { UserContext } from "../contexts/UserContext";
import UserBox from "./UserBox";

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
