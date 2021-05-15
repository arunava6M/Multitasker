import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
   style: {
      height: ({height}) => height,
      width: ({width}) => width
   }
})

const Spacing = ({height ,width}) => {
   const classes = useStyles({ height,width })

   return <div className={classes.style} />
}

export default Spacing
