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
    width: "70%",
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

const UserBox = ({ email }) => {
  const classes = userBoxStyles();
  const [user, setUser] = useState({});
  db.collection("users")
    .doc(email)
    .onSnapshot((doc) => {
      // console.log("document: ", doc);
      setUser(doc.data());
    });
  return (
    <Box height="30px" width="200px" alignItems="center">
      <img className={classes.image} src={user.photoURL} alt="DP" />
      &nbsp;&nbsp;&nbsp;
      <Text variant="small">{user.displayName}</Text>
    </Box>
  );
};

const ContributorPanel = ({ height, width }) => {
  const classes = useStyles({ height, width });

  const [gmail, setGmail] = useState(null);
  const [contributors, setContributors] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    user.email &&
      db
        .collection("contributors")
        .doc(user.email)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setContributors(doc.data());
          }
        });
  }, [user, setContributors]);

  const gmailInput = (e) => setGmail(e.target.value);

  const addContributor = () => {
    //if contributor not present as user then dont add else add a contributor
    db.collection("users")
      .doc(gmail)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          alert("Contributor is not a user.");
        } else {
          db.collection("contributors")
            .doc(user.email)
            .set({
              ...contributors,
              [gmail]: true,
            });
          db.collection("contributeTo")
            .doc(gmail)
            .set({
              ...contributors,
              [user.email]: false,
            });
          alert("Request sent successfully.");
        }
      });

    setGmail("");
  };

  return (
    <div className={classes.style}>
      {contributors &&
        Object.entries(contributors).map(
          (c) => c[1] && <UserBox email={c[0]} />
        )}
      <input
        className={classes.input}
        value={gmail}
        type="email"
        onChange={gmailInput}
      />
      <Box variant="button" onClick={addContributor}>
        {icons["add"]}
      </Box>
    </div>
  );
};

export default ContributorPanel;
