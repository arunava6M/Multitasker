import { createUseStyles } from 'react-jss'
import { useState } from 'react'
import { icons } from '../icons'

const useStyles = createUseStyles({
   header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      width: '90%'
    },
    input: {
      border: '0',
      fontWeight: '600',
      fontSize: '16px',
      maxWidth: '100%',
      background: 'none',
  
      '&:focus': {
        outline: 'none'
      }
    },
    button: {
      height: '15px',
      minWidth: '15px',
      borderRadius: '50%',
      backgroundColor: 'inherit',
      color: 'red',
      padding: '2px',
      border: 'none',
      cursor: 'pointer',
      display: ({ hovered}) => !hovered && 'none',
    }
})

const TitleHeader = ({ handleChange, value, handleDelete, placeholder}) => {
   const [ hovered, setHovered ] = useState(false)
   const classes = useStyles({ hovered })
   return (
      <div className={classes.header} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
        <input className={classes.input} placeholder={placeholder} onChange={handleChange} value={value} />
        <button className={classes.button} onClick={handleDelete}>{icons['close']}</button>
      </div>
   )
}

export default TitleHeader
