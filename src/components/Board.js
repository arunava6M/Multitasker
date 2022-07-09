import { createUseStyles } from "react-jss";

import TitleHeader from "./TitleHeader";

const useStyles = createUseStyles({
  board: {
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    width: "280px",
    margin: "0 50px 0 10px",
    padding: "15px",
    // backgroundColor: "rgba(25, 28, 41,0.5)",
    // boxShadow: "2px 1px 39px -3px rgba(0,0,0,0.2)",
    overflow: "hidden",
    maxHeight: "800px",
    overflowY:"auto",
    background: 'linear-gradient(145deg, #2b2145, #332852)',
      boxShadow:  `32px 32px 64px #241c3a,
      -32px -32px 64px #3c2e60`
  },
});

const Board = ({ team, updateBoard, children, onDrop, deleteBoard }) => {
  const classes = useStyles({children});
  console.log("asdasd: ", children.length)
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
