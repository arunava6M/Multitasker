import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(() => {
   const commonStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px',
      margin: '10px',
   }
// #e26a29
   return ({
      container_wrapper: {
         ...commonStyle,

         height: ({ height }) => height || '80vh',
         width: ({ width }) => width || '70vw',
         maxWidth: ({ maxWidth }) => maxWidth,
         borderRadius: '30px',
         padding: '10px',
         backgroundColor: ({ orangy, primary }) => (!orangy && primary) ? '#eb762b' : '#ede6e1',
         backgroundImage: ({ orangy }) => orangy && 'linear-gradient(to bottom right, #eb762b 10%, #c2581f)',
         boxShadow: ({shadow}) => shadow && '-1px 93px 73px -53px rgba(0,0,0,0.53)'
      },

      container_button: {
         ...commonStyle,

         minWidth: '50px',
         color: ({bordered}) => bordered ? '#eb762b' : '#fff',
         transition: '0.2s',
         cursor: 'pointer',
         borderRadius: '15px',
         border: ({ bordered }) => bordered && '5px',
         borderColor: ({bordered}) => bordered && '#eb762b',

         '&:hover': {
            backgroundColor: 'white',
            color: 'black'
         }

      }
   })
})

const Box = ({ children, variant = 'wrapper', maxWidth, bordered, onClick, height, shadow, width, orangy, transparent, clickable }) => {
  const classes = useStyles({height, shadow, width, maxWidth, bordered, orangy, transparent, clickable})
  return (
    <div className={classes[`container_${variant}`]} onClick={onClick}>{children}</div>
  )
}

export default Box
