import { useState, useEffect, useContext } from "react";

import Board from "./Board";
import Box from "./Box";
import Card from "./Card";
import { db } from "../firebase";
import { UserContext } from "../contexts/UserContext";
import Button from "./Button";
import UserBox from "./UserBox";
import Grouped from "./Grouped";
import Text from "./Text";
import Spacing from "./Spacer";

const Dashboard = () => {
  const user = useContext(UserContext);
  const [cardsData, setCardsData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    console.log('inside Dashboard')
    db.collection("cards").onSnapshot((snapshot) => {
      setCardsData(
        snapshot.docs
          .filter((doc) => doc.data().owner === user.email || doc.data().contributor === user.email)
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
  const declinedCard = (id) => {
    db.collection("cards")
      .doc(id)
      .update({
        accepted: "DECLINED",
      });
  }

  return (
    <Box height="100%" width="90%" padding='0 0 0 60px'>
      {teamsData.map((team) => (
        <Board
          key={team.id}
          team={team}
          onDrop={onDrop}
          // updateBoard={updateBoard}
        >
          {team.id === "toDo" && (
            <>
              <Button
              onClick={() => addNewCard(team.id)}
              width="80px"
              height="30px"
              variant="text"
              >
                <Text variant="small" color="#eb762b">Add card</Text>
              </Button>
              <Spacing height="20px" />
            </>
          )}
          {cardsData
            .filter((card) => card.teamId === team.id)
            .map((card) => (
              <Card
                key={card.id}
                data={card}
                deleteCard={deleteCard}
                updateCard={updateCard}
                customBlock={card.contributor && (() =>
                  (
                    <>
                      <Grouped>
                        {card.accepted === "DECLINED" && <Text variant="small" color="rgb(255, 255, 255, 0.5)">Task Declined</Text>}
                        {card.accepted !== "DECLINED" && <Text variant="small" color="rgb(255, 255, 255, 0.9)">Assigned by</Text>}
                        <UserBox email={card.contributor} onlyPic />
                      </Grouped>
                      {!card.accepted && (
                        <>
                          <Spacing height="5px" />
                          <Grouped>
                            <Button
                              color="rgb(255, 255, 255, 0.6)"
                              height="5px"
                              onClick={() => declinedCard(card.id)}
                              width="60px"
                            >
                              Decline
                            </Button>
                            <Button
                              color="#eb762b"
                              height="4px"
                              onClick={() => acceptCard(card.id)}
                              width="60px"
                            >
                              Accept
                            </Button>
                          </Grouped>
                        </>
                      )}
                    </>
                  ))
                }
              />
            ))}
        </Board>
      ))}
    </Box>
  );
};

export default Dashboard;
