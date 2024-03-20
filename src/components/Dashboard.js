import { useState, useEffect, useContext } from "react";
import { createUseStyles } from "react-jss";
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
import styled from "styled-components";
import loader from "../images/Hourglass.gif";

const DateWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #cccccc;
`;

const LoaderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadGif = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
`;

const Date = styled.div`
  padding: 5px;
  background-color: ${({ selected }) => (selected ? "#ff9f1c" : "#FFF2E0")};
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    background-color: #ffb569;
    transform: scale(1.2);
  }
`;

const MovableContainer = styled.div`
  position: relative;
  display: block;
  margin-top: 10px;
  left: ${({ position }) => `${position.left - 280}px`};
  transition: left 0.6s ease-in-out;
`;
const useStyles = createUseStyles({
  eachDateWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  greenDot: {
    width: "10px",
    height: "10px",
    backgroundColor: "#2ec4b6",
    borderRadius: "50%",
    display: "inline-block",
    marginBottom: "5px",
  },
  noDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
    marginBottom: "5px",
  },
  selectedDate: {
    backgroundColor: "ff9f1c",
  },
});

const Dashboard = () => {
  const user = useContext(UserContext);
  const [cardsData, setCardsData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  const [hasBoards, setHasBoards] = useState(undefined);
  const [date, setDate] = useState(0);
  const classes = useStyles();
  const [taskBoardPosition, setTaskBoardPosition] = useState({});
  const [loading, setLoading] = useState(true);

  // const currentDate =
  // useEffect(() => {
  //   console.log("inside Dashboard");
  //   db.collection("cards").onSnapshot((snapshot) => {
  //     setCardsData(
  //       snapshot.docs
  //         .filter(
  //           (doc) =>
  //             doc.data().owner === user.email ||
  //             doc.data().contributor === user.email
  //         )
  //         .map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }))
  //     );
  //   });

  //   db.collection("boards").onSnapshot((snapshot) => {
  //     setTeamsData(snapshot.docs.map((doc) => doc.data()));
  //   });
  //   const boardsRef = db.collection("boards");
  //   const boardId = "ScHn81SzLVhm84s8YpRp";
  //   const boardDocRef = boardsRef.doc(boardId);
  //   const cardsCollectionRef = boardDocRef.collection("Cards");
  //   cardsCollectionRef.onSnapshot((snapshot) => {
  //     console.log(
  //       "card snapshot :",
  //       snapshot.docs.map((doc) => doc.data())
  //     );
  //   });
  // }, [user]);
  // console.log(teamsData);
  useEffect(() => {
    var a = new window.Date();
    setDate(a.getDate());
    // Reference to the "users" collection
    const usersRef = db.collection("users");
    //db.collection('user').doc(user.email).collection('boards')

    // Assuming you have the email ID of the user
    // const email = 'user@example.com';

    // Reference to the specific user document by email ID
    const userDocRef = usersRef.doc(user.email);

    // Reference to the "boards" subcollection under the user document
    const boardsCollectionRef = userDocRef.collection("boards");

    // Check if any documents exist in the "boards" subcollection
    const checkBoards = async () => {
      try {
        const snapshot = await boardsCollectionRef.get();
        const boardsArray = [];
        // Iterate over each board document
        await Promise.all(
          snapshot.docs.map(async (boardDoc) => {
            const boardData = { id: boardDoc.id, ...boardDoc.data() };

            // Retrieve cards for the current board
            const taskCollectionRef = boardDoc.ref.collection("tasks");
            const tasksSnapshot = await taskCollectionRef.get();
            const tasksArray = tasksSnapshot.docs.map((taskDoc) => ({
              id: taskDoc.id,
              ...taskDoc.data(),
            }));

            // Add board and its cards to the array
            boardsArray.push({ ...boardData, tasks: tasksArray });
          })
        );
        // console.log("hero", boardsArray);

        // const boardsIdArray = snapshot.docs.map((doc) => doc.id);
        setAllBoards(boardsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error checking boards: ", error);
      }
    };

    checkBoards();
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

  const updateTask = (key, boardId, taskId, input) => {
    const cardRef = db
      .collection("users")
      .doc(user.email)
      .collection("boards")
      .doc(boardId)
      .collection("tasks")
      .doc(taskId);

    cardRef
      .update({
        [key]: input,
      })
      .then(() => {
        console.log("Card updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  };

  // const updateBoard = (input, id) => {
  //    db.collection(user.uId).doc()
  //   setTeamsData((prevState) => {
  //     const i = prevState.findIndex((board) => board.id === id);
  //     prevState[i].name = input;
  //     return prevState;
  //   });
  // };
  // const acceptCard = (id) => updateCard("accepted", true, id);
  const declinedCard = (id) => {
    db.collection("cards").doc(id).update({
      accepted: "DECLINED",
    });
  };

  // const customBlockRenderer = ({ owner, accepted, contributor, id }) => {
  //   const isCardOwner = owner === user.email;
  //   return (
  //     <>
  //       <Grouped>
  //         {accepted === "DECLINED" && (
  //           <Text variant="small" color="rgb(255, 255, 255, 0.5)">
  //             Task Declined
  //           </Text>
  //         )}
  //         {accepted !== "DECLINED" && (
  //           <Text variant="small" color="rgb(255, 255, 255, 0.9)">
  //             Assigned {isCardOwner ? "to" : "by"}
  //           </Text>
  //         )}
  //         <UserBox email={isCardOwner ? contributor : owner} onlyPic />
  //       </Grouped>
  //       {!isCardOwner && !accepted && (
  //         <>
  //           <Spacing height="5px" />
  //           <Grouped>
  //             <Button
  //               color="rgb(255, 255, 255, 0.6)"
  //               height="5px"
  //               onClick={() => declinedCard(id)}
  //               width="60px"
  //             >
  //               Decline
  //             </Button>
  //             <Button
  //               color="#eb762b"
  //               height="4px"
  //               onClick={() => acceptCard(id)}
  //               width="60px"
  //             >
  //               Accept
  //             </Button>
  //           </Grouped>
  //         </>
  //       )}
  //     </>
  //   );
  // };
  const addTask = () => {
    const createBoardAndCards = async () => {
      try {
        const usersRef = db.collection("users");

        // Reference to the specific user document by email ID
        const userDocRef = usersRef.doc(user.email);

        // Custom board ID
        const customBoardId = date.toString(); // Replace 'your_custom_board_id' with your desired ID

        // Reference to the board document with the custom ID in the "boards" collection
        const boardRef = userDocRef.collection("boards").doc(customBoardId);

        // Add the custom board document to the "boards" collection
        await boardRef.set({
          // Add board data if needed
        });

        // Create a new collection of cards under the board document
        await boardRef.collection("tasks").add({
          // Add card data if needed
          title: "Task title",
          description: "Description of Example task",
          // Add more fields as needed
        });

        console.log("Board and tasks created successfully.");
      } catch (error) {
        console.error("Error creating board and tasks: ", error);
      }
    };
    createBoardAndCards();
  };
  // console.log(taskBoardPosition);

  if (loading) {
    return (
      <LoaderWrapper>
        <LoadGif src={loader} alt="loading..." />
      </LoaderWrapper>
    );
  }
  return (
    <Box height="100%" width="90%" padding="0 0 0 60px" flexDirection="column">
      <DateWrapper>
        {Array.from(Array(31).keys())
          .filter((each) => each !== 0)
          .map((each, index) => (
            <div className={classes.eachDateWrapper}>
              <div
                className={
                  allBoards.some((eachBoard) => eachBoard.id == each)
                    ? classes.greenDot
                    : classes.noDot
                }
              />
              <Date
                key={index}
                onClick={(event) => {
                  setDate(each);
                  const rect = event.target.getBoundingClientRect();
                  const distFromRightWindowEdge =
                    window.innerWidth - rect.right;
                  const topPosition = rect.bottom + window.scrollY;
                  setTaskBoardPosition({
                    top: topPosition,
                    left:
                      distFromRightWindowEdge > 400
                        ? rect.left
                        : rect.right - 200,
                  });
                }}
                selected={each === date}
              >
                {each}
              </Date>
            </div>
          ))}
      </DateWrapper>
      <Box>
        {allBoards.length === 0 && (
          <div>
            <div>So empty !!</div>
            <div>Choose a date !</div>
            {date}
            <div>Now add a task for this date</div>
            <Button
              onClick={() => addTask()}
              width="80px"
              height="30px"
              // variant="text"
              bg={"#DDF7ED"}
            >
              <Text variant="small" color="#066D4F">
                Add task
              </Text>
            </Button>
          </div>
        )}
        <MovableContainer position={taskBoardPosition}>
          {allBoards
            .filter((eachBoard) => eachBoard.id === date.toString())
            .map((eachBoard) => (
              <Board
                key={eachBoard.id}
                team={eachBoard}
                onDrop={onDrop}
                // updateBoard={updateBoard}
              >
                <>
                  <Button
                    onClick={() => addTask()}
                    width="80px"
                    height="30px"
                    // variant="text"
                    bg={"#DDF7ED"}
                  >
                    <Text variant="small" color="#066D4F">
                      Add task
                    </Text>
                  </Button>
                  <Spacing height="20px" />
                </>

                <div>
                  {eachBoard.tasks.map((eachTask) => (
                    <Card
                      key={eachTask.id}
                      data={eachTask}
                      deleteCard={deleteCard}
                      updateCard={updateTask}
                      boardId={eachBoard.id}
                      // customBlock={
                      //   card.contributor && (() => customBlockRenderer(card))
                      // }
                    />
                  ))}
                </div>
              </Board>
            ))}
          {allBoards.every((eachBoard) => eachBoard.id !== date.toString()) && (
            <Board
              key={date}
              team={{ id: date }}
              onDrop={onDrop}
              // updateBoard={updateBoard}
            >
              <div>
                <div>So empty !!</div>
                <div>
                  Take a chill pill and get busy doing something.
                  <br /> Add a task for this date
                </div>
                <Button
                  onClick={() => addTask()}
                  width="80px"
                  height="30px"
                  // variant="text"
                  bg={"#DDF7ED"}
                >
                  <Text variant="small" color="#066D4F">
                    Add task
                  </Text>
                </Button>
              </div>
            </Board>
          )}
        </MovableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
