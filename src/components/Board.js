import { createUseStyles } from "react-jss";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

import TitleHeader from "./TitleHeader";

const useStyles = createUseStyles({
  board: {
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    width: "280px",
    margin: "0 50px 0 10px",
    padding: "15px",
    overflow: "hidden",
    overflowY: "auto",
    color: ({ theme }) => theme.primarytext,
    background: ({ theme }) => theme.boardBackground,
    // boxShadow:  `32px 32px 64px #241c3a,
    //   -32px -32px 64px #3c2e60`
  },
});

const Board = ({ team, updateBoard, children, onDrop, deleteBoard }) => {
  const theme = useContext(ThemeContext);
  const classes = useStyles({ children, theme });
  const handleDrop = (e) => {
    const cardProps = JSON.parse(e.dataTransfer.getData("card"));
    onDrop(team.id, cardProps);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      key={team.id}
      id={team.id}
      onDrop={handleDrop}
      onDragOver={onDragOver}
      className={classes.board}
    >
      <TitleHeader
        value={`Task board for ${team.id}th`}
        placeholder="Enter team name"
      />
      {children}
    </div>
  );
};

export default Board;
