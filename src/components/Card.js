import { useState } from "react";
import { createUseStyles } from "react-jss";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

import TitleHeader from "./TitleHeader";

const useStyles = createUseStyles({
  constainer: {
    padding: "10px 15px",
    backgroundColor: ({ theme }) => theme.cardBackground,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    cursor: "pointer",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "0.03px solid #cccccc",
    borderWidth: "thin",
    transition: "0.3s",
    transform: ({ dragStarted }) => dragStarted && "rotate(10deg)",
  },

  customBlock: {
    backgroundImage:
      "linear-gradient(135deg, rgba(53, 54, 59,0.9), rgba(53, 54, 59,0.3), rgba(53, 54, 59,0.0))",
    zIndex: "0",
    marginTop: "10px",
    borderRadius: "0 0 12px 12px",
    padding: "10px",
  },

  textarea: {
    border: "0",
    color: ({ theme }) => theme.primarytext,
    background: "none",
    minHeight: "60px",
    "&:focus": {
      outline: "none",
    },

    "&::-webkit-scrollbar": {
      width: "0.5em",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkGrey",
      borderRadius: "30px",
      outline: "none",
      cursor: "pointer",
    },

    "&::-webkit-resizer": {
      display: "none",
    },
  },
});

const Card = ({ deleteCard, data, updateCard, customBlock, boardId }) => {
  const [description, setDescription] = useState(data.description);
  const [title, setTitle] = useState(data.title);
  const [dragStarted, setDragStarted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const theme = useContext(ThemeContext);
  const classes = useStyles({ dragStarted, description, theme });

  const dragStart = (e) => {
    setDragStarted(true);
    e.dataTransfer.setData("card", JSON.stringify(data));
    setTimeout(() => {
      e.target.style.visibility = "hidden";
    }, 1);
  };

  const dragOver = (e) => e.preventDefault();

  const onDragEnd = (e) => {
    setDragStarted(false);
    e.target.style.visibility = "visible";
  };

  const handleChangeDesc = (e) => {
    setDescription(e.target.value);
    setTimeout(
      () => updateCard("description", boardId, data.id, e.target.value),
      300
    );
    // key, boardId, cardId, input
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    setTimeout(
      () => updateCard("title", boardId, data.id, e.target.value),
      1000
    );
  };

  const hadleDelete = () => deleteCard(data.id);

  return (
    <div
      className={classes.constainer}
      draggable={true}
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDragEnd={onDragEnd}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <TitleHeader
        hovered={hovered}
        value={title}
        handleChange={handleChangeTitle}
        handleDelete={hadleDelete}
        placeholder="Enter name"
      />
      <textarea
        className={classes.textarea}
        onChange={handleChangeDesc}
        value={description}
        placeholder="Describe the task"
      />
      {customBlock && (
        <div className={classes.customBlock}>{customBlock()}</div>
      )}
    </div>
  );
};

export default Card;
