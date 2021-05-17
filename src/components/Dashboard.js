import { useState, useEffect, useContext } from "react";
import { createUseStyles } from "react-jss";

import Board from "./Board";
import Box from "./Box";
import Card from "./Card";
import { icons } from "../icons";
import { db } from "../firebase";
import { UserContext } from "../contexts/UserContext";

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

  return (
    <Box height="80%" width="700px">
      {teamsData.map((team) => (
        <Board
          key={team.id}
          team={team}
          onDrop={onDrop}
          // updateBoard={updateBoard}
        >
          {cardsData
            .filter((card) => card.teamId === team.id)
            .map((card) => (
              <Card
                key={card.id}
                data={card}
                deleteCard={deleteCard}
                updateCard={updateCard}
              />
            ))}
          {team.id === "toDo" && (
            <Box
              variant="button"
              bordered
              className={classes.button}
              onClick={() => addNewCard(team.id)}
            >
              {icons["add"]}
            </Box>
          )}
        </Board>
      ))}
    </Box>
  );
};

export default Dashboard;
