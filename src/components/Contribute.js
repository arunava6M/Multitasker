import { createUseStyles } from "react-jss";
import { useEffect, useState, useContext, Fragment } from "react";
import Box from "./Box";
import { UserContext } from "../contexts/UserContext";

import { db } from "../firebase";
import UserBox from "./UserBox";
import Card from "./Card";
import Button from "./Button";
import Text from "./Text";
import Spacer from "./Spacer";
import Spacing from "./Spacer";
import Grouped from "./Grouped"

const useStyles = createUseStyles({
  cardContainer: {
    flex: 1.5,
    boxShadow: "2px 1px 39px -3px rgba(0,0,0,0.5)",
    overflow: "hidden",
    maxHeight: "800px",
    overflowY:"auto",
    padding: "20px"
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
  const [searchedUser,setSearchedUser] = useState({});

  console.log('contributors: ', contributeToList)
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
          .filter((doc) => doc.data().owner === user.email)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
      );
    });
  }, []);

  const addNewCard = () => {
    const newCard = {
      owner: user.email,
      teamId: "toDo",
      title: "",
      contributor: "",
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

  const assignContributor = (email, cardId) => {
    updateCard("contributor", email, cardId);
    updateCard("accepted", false, cardId);
  };

  const contributorsEmailArray = Object.keys(contributeToList)
  
  const serachContributers = (e, cardId) => {
    const searchQuery = e.target.value
    const searchOutput = contributorsEmailArray.filter(el => el.includes(searchQuery)) 
    setSearchedUser({[`${cardId}`]: searchOutput}); 
  }

  const searchRenderer = (cardId) => (
    <Fragment key={cardId}>
      <Text variant="small" color="rgb(255, 255, 255, 0.5)" >Assign a contributor:</Text>
      <Spacer height="10px" />
      <input type='text' onChange={(e)=>serachContributers(e, cardId)} />
      {
        searchedUser[cardId] && searchedUser[cardId].length>0 && 
          searchedUser[cardId].map(email=><UserBox onClick={() => assignContributor(email, cardId)} email={email} />)
      }
    </Fragment>
  )

  const taskStatusRenderer = (accepted, contributor) => {
    let showText = ""
    switch (accepted) {
      case true: showText = 'Assigned to'
        break;
      case 'DECLINED': showText = 'Task declined'
        break;
    
      default:
        showText = 'Requested for acceptance'
    }

    return (
      <Grouped>
        <Text variant="small" color="rgb(255, 255, 255, 0.5)">
          {showText}
          </Text>
        <Spacing width="10px" />
        <UserBox email={contributor} />
      </Grouped> 
    )
  }

  return (
    <Box height="80%" width="90%">
      <div className={classes.cardContainer}>
        <Button
          onClick={addNewCard}
          height={20}
          color="#fff"
          bg='rgba(53, 54, 59,0.5)'
          width={100}
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
            customBlock={() =>(card.contributor ? taskStatusRenderer( card.accepted, card.contributor): searchRenderer(card.id))}
          />
        ))}
      </div>
      <div className={classes.listContainer}>
        {contributeToList &&
          Object.entries(contributeToList).map((c) => (
            <UserBox email={c[0]} />
          ))}
      </div>
    </Box>
  );
};

export default Contribute;
