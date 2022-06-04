import { useState, useEffect, useContext } from "react";
import { createUseStyles } from "react-jss";

import Board from "./Board";
import Box from "./Box";
import Card from "./Card";
import { icons } from "../icons";
import { db } from "../firebase";
import { UserContext } from "../contexts/UserContext";
import Button from "./Button";
import UserBox from "./UserBox";
import Grouped from "./Grouped";
import Text from "./Text";

const useStyles = createUseStyles({
  flexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",

    width: "100%",
    minHeight: "100vh",

    margin: "0 auto",
    padding: "1px",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [cardsData, setCardsData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    db.collection("cards").onSnapshot((snapshot) => {
      setCardsData(
        snapshot.docs
          .filter((doc) => doc.data().owner === user.email)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
      );
    });

    db.collection("boards").onSnapshot((snapshot) => {
      setTeamsData(snapshot.docs.map((doc) => doc.data()));
    });
  }, [user]);

  const onDrop = (teamId, cardProps) => {
    if (cardProps.teamId !== teamId) {
      db.collection("cards").doc(cardProps.id).update({
        teamId,
      });
    }
  };

  const deleteCard = (id) => {
    db.collection("cards").doc(id).delete();
  };

  const addNewCard = () => {
    const newCard = {
      owner: user.email,
      teamId: "toDo",
      title: "",
      description: "",
    };
    db.collection("cards").add(newCard);
  };

  const updateCard = (key, input, id) => {
    db.collection("cards")
      .doc(id)
      .update({
        [key]: input,
      });
  };

  //   const updateBoard = (input, id) => {
  //      db.collection(user.uId).doc()
  //     setTeamsData((prevState) => {
  //       const i = prevState.findIndex((board) => board.id === id);
  //       prevState[i].name = input;
  //       return prevState;
  //     });
  //   };
  const acceptCard = (id) => updateCard("accepted", true, id);

  return (
    <Box height="100%" width="90%">
      {teamsData.map((team) => (
        <Board
          key={team.id}
          team={team}
          onDrop={onDrop}
          // transparent={true}
          // updateBoard={updateBoard}
        >
          {team.id === "toDo" && (
            <Button
              color="#eb762b"
              className={classes.button}
              onClick={() => addNewCard(team.id)}
            >
              {icons["add"]}
            </Button>
          )}
          {cardsData
            .filter((card) => card.teamId === team.id)
            .map((card) => (
              <Card
                key={card.id}
                data={card}
                deleteCard={deleteCard}
                updateCard={updateCard}
                customBlock={() =>
                  card.contributor && (
                    <>
                      <Grouped>
                        <Text variant="small">Assigned by</Text>
                        <UserBox email={card.contributor} onlyPic />
                      </Grouped>
                      {!card.accepted && (
                        <Grouped>
                          <Button
                            color="#eb762b"
                            height={5}
                            onClick={() => deleteCard(card.id)}
                          >
                            Decline
                          </Button>
                          <Button
                            bg="#eb762b"
                            height={5}
                            onClick={() => acceptCard(card.id)}
                          >
                            Accept
                          </Button>
                        </Grouped>
                      )}
                    </>
                  )
                }
              />
            ))}
        </Board>
      ))}
    </Box>
  );
};

export default Dashboard;
