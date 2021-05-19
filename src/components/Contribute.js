import { createUseStyles } from "react-jss";
import { useEffect, useState, useContext } from "react";
import Box from "./Box";
import { UserContext } from "../contexts/UserContext";

import { db } from "../firebase";
import UserBox from "./UserBox";
import Card from "./Card";
import Button from "./Button";
import Text from "./Text";
import Spacer from "./Spacer";

const useStyles = createUseStyles({
  cardContainer: {
    flex: 1.5,
  },
  listContainer: {
    marginLeft: "20px",
    flex: 1,
  },
});

const Contribute = () => {
  const classes = useStyles();
  const [contributeToList, setContributeToList] = useState([]);
  const [contributedCards, setContributedCards] = useState([]);
  const [sendTo, setSendTo] = useState(null);

  const user = useContext(UserContext);

  useEffect(() => {
    user.email &&
      db
        .collection("contributeTo")
        .doc(user.email)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setContributeToList(doc.data());
          }
        });
  }, [user, setContributeToList]);

  useEffect(() => {
    db.collection("cards").onSnapshot((snapshot) => {
      setContributedCards(
        snapshot.docs
          .filter((doc) => doc.data().contributor === user.email)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
      );
    });
  }, [sendTo]);

  const addNewCard = () => {
    const newCard = {
      owner: "",
      teamId: "toDo",
      title: "",
      contributor: user.email,
      description: "",
    };
    db.collection("cards").add(newCard);
  };

  const deleteCard = (id) => {
    db.collection("cards").doc(id).delete();
  };

  const updateCard = (key, input, id) => {
    db.collection("cards")
      .doc(id)
      .update({
        [key]: input,
      });
  };

  const contributeTo = (email) => {
    updateCard("owner", email, contributedCards[0].id);
    updateCard("accepted", false, contributedCards[0].id);
  };

  console.log(sendTo);
  return (
    <Box height="80%" width="90%">
      <div className={classes.cardContainer}>
        <Button
          onClick={addNewCard}
          height={20}
          color="#fff"
          width={70}
          bg="#b5b1b0"
        >
          <Text variant="small">Give task</Text>
        </Button>
        <Spacer height="10px" />
        {contributedCards.map((card) => (
          <Card
            key={card.id}
            data={card}
            deleteCard={deleteCard}
            updateCard={updateCard}
            customBlock={() =>
              card.owner && (
                <UserBox email={card.owner} onlyPic customText="Assigned to" />
              )
            }
          />
        ))}
      </div>
      <div className={classes.listContainer}>
        {contributeToList &&
          Object.entries(contributeToList).map((c) => (
            <UserBox onClick={() => contributeTo(c[0])} email={c[0]} />
          ))}
      </div>
    </Box>
  );
};

export default Contribute;
