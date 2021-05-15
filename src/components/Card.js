import {useState} from "react";
import { createUseStyles } from 'react-jss'

import TitleHeader from './TitleHeader'

const useStyles = createUseStyles({
  constainer: {
    padding: '15px 25px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    marginBottom: '15px',
    minHeight: '100px',
   //  width: '50%',
    borderRadius: '12px',
    transition: '0.3s',
   //  transform: ({ dragStarted }) => dragStarted && 'rotate(10deg)'
  },
  
  textarea: {
    border: '0',
    background: 'none',
    height: '80%',

    '&:focus': {
      outline: 'none'
    },

    '&::-webkit-scrollbar': {
      width: '0.5em'
    },
    
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkGrey',
      borderRadius: '30px',
      outline: 'none',
      cursor: 'pointer'
    },

    '&::-webkit-resizer': {
       display: 'none'
    }
  },
  
})

const Card = ({ deleteCard, data, updateCard })=> {
  const [ description, setDescription ] = useState(data.description)
  const [ title, setTitle ] = useState(data.title)
  const [ dragStarted, setDragStarted ] = useState(false)
  const classes = useStyles({ dragStarted })

  const dragStart = e => {
    setDragStarted(true)
    e.dataTransfer.setData("card", JSON.stringify(data));
    setTimeout(() => {
      e.target.style.visibility = "hidden"
    }, 1)
  };

  const dragOver = e => e.preventDefault()

  const onDragEnd = e => {
   setDragStarted(false)
    console.log('drag end')
    e.target.style.visibility = "visible"
  }

  const handleChangeDesc = e => {
    setDescription(e.target.value)
    setTimeout(() => updateCard('description', e.target.value, data.id), 300)
  }

  const handleChangeTitle = e => {
    setTitle(e.target.value)
    setTimeout(() => updateCard('title', e.target.value, data.id), 1000)
  }

  const hadleDelete = () => deleteCard(data.id)

  return (
    <div
      className={classes.constainer}
      draggable={true}
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDragEnd={onDragEnd}
    >
      <TitleHeader
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
    </div>
  );
};

export default Card;
