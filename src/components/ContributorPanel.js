import { createUseStyles } from "react-jss";
import { useState, useContext, useEffect } from "react";

import { db } from "../firebase";
import { icons } from "../icons";
import { UserContext } from "../contexts/UserContext";
import Grouped from "./Grouped";
import Text from "./Text";
import Button from "./Button";
import { useKeypress } from "../hooks/useKeypress";
import UserBox from "./UserBox";

const useStyles = createUseStyles({
  style: {
    height: "250px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    outline: "none",
    width: "80%",
    margin: "5px",
    border: "none",
    borderBottom: "3px solid #eb762b",
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
    "&::placeholder": {
      color: "#ffc799",
    },
  },
  addButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
    height: "40px",
    width: "200px",
    borderRadius: "20px",
    border: "2px solid #ffc799",
    cursor: "pointer",
  },
});

const ContributorPanel = ({ height, width }) => {
  const classes = useStyles({ height, width });

  const [gmail, setGmail] = useState("");
  const [contributors, setContributors] = useState([]);
  const [addClicked, setAddClicked] = useState(false);

  const user = useContext(UserContext);

  useKeypress("Escape", () => setAddClicked(false));
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

  const handleAddClick = () => setAddClicked(true);

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
            .set(
              {
                [user.email]: false,
              },
              { merge: true }
            );
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
      <div className={classes.addButton} onClick={handleAddClick}>
        {addClicked ? (
          <Grouped>
            <input
              className={classes.input}
              value={gmail}
              type="email"
              onChange={gmailInput}
              placeholder={`Add or press 'Esc'`}
            />
            <Button variant="text" onClick={addContributor}>
              <Text color="#ffc799" variant="regular">
                {icons["send"]}
              </Text>
            </Button>
          </Grouped>
        ) : (
          <>
            <Text variant="regular" color="#ffc799">
              {icons["add"]}
            </Text>
            <Text variant="small" color="#ffc799">
              Add contributor
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

export default ContributorPanel;
