import { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

import Header from "./Header";
import Board from "./Board";
import Box from "./Box";
import Card from "./Card";
import { cards, teams } from "../data";
import { icons } from "../icons";

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
  const [cardsData, setCardsData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    console.log("inside useEffect");
    setCardsData(cards);
    setTeamsData(teams);
  }, []);

  const onDrop = (teamId, cardProps) => {
    if (cardProps.teamId !== teamId) {
      setCardsData((prevState) => [
        { ...cardProps, teamId },
        ...prevState.filter((el) => el.id !== cardProps.id),
      ]);
    }
  };

  const deleteCard = (id) => {
    setCardsData((prevState) => prevState.filter((el) => el.id !== id));
  };

  const deleteBoard = (teamId) => {
    setTeamsData((prevState) => prevState.filter((team) => team.id !== teamId));
    setCardsData((prevState) => prevState.filter((el) => el.teamId !== teamId));
  };

  const addNewCard = (teamId) => {
    const newCard = {
      id: Math.floor(Math.random() * 100),
      teamId,
      title: "",
      description: "",
    };
    setCardsData((prevState) => [...prevState, newCard]);
  };

  const updateCard = (key, input, id) => {
    setCardsData((prevState) => {
      const i = prevState.findIndex((card) => card.id === id);
      prevState[i][key] = input;
      return prevState;
    });
  };

  const updateBoard = (input, id) => {
    console.log(id);
    setTeamsData((prevState) => {
      const i = prevState.findIndex((board) => board.id === id);
      console.log(i);
      prevState[i].name = input;
      return prevState;
    });
  };

  return (
    <div className="main">
      <Header />
      <Box height="80%" width="700px">
        {teamsData.map((team) => (
          <Board
            key={team.id}
            team={team}
            onDrop={onDrop}
            deleteBoard={deleteBoard}
            updateBoard={updateBoard}
          >
            {cardsData
              .filter((card) => card.teamId === team.id)
              .map((card) => {
                console.log("renderedcard: ", card);
                return (
                  <Card
                    key={card.id}
                    data={card}
                    deleteCard={deleteCard}
                    updateCard={updateCard}
                  />
                );
              })}
            <Box
              variant="button"
              bordered
              className={classes.button}
              onClick={() => addNewCard(team.id)}
            >
              {icons["add"]}
            </Box>
          </Board>
        ))}
      </Box>
    </div>
  );
};

export default Dashboard;
