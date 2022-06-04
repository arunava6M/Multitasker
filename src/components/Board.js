import { createUseStyles } from "react-jss";

import TitleHeader from "./TitleHeader";

const useStyles = createUseStyles({
  board: {
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    width: "280px",
    margin: "10px",
    padding: "15px",
    // backgroundColor: "#e7e9f6",
   backgroundColor: 'rgba(25, 28, 41,0.5)',
   boxShadow: '2px 1px 39px -3px rgba(0,0,0,0.2)',
   height: ({children}) => `${children.length * 200}px`

    // height: "auto"
  },
});

const Board = ({ team, updateBoard, children, onDrop, deleteBoard }) => {
  const classes = useStyles({children});
  console.log('asdasd: ', children.length)
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
