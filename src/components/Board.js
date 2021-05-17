import { createUseStyles } from "react-jss";

import TitleHeader from "./TitleHeader";

const useStyles = createUseStyles({
  board: {
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    width: "25%",
    margin: "10px",
    padding: "15px",
  },
});

const Board = ({ team, updateBoard, children, onDrop, deleteBoard }) => {
  const classes = useStyles();

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
      <TitleHeader value={team.name} placeholder="Enter team name" />
      {children}
    </div>
  );
};

export default Board;
