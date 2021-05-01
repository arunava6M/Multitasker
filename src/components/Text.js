import { createUseStyles } from 'react-jss'
import Proptypes from 'prop-types'

const useStyles = createUseStyles(() => {
   const baseStyles = {
      color: ({color}) => color,
      fontFamily: `'Open Sans', sans-serif`,
      lineHeight: 1.2,
      fontWeight: ({bold}) => bold ? 700 : 400,

      '&: hover': {
         color: ({hover}) => hover
      }
   }

   return {
      bigText: {
         ...baseStyles,
         fontSize: '40px',

      },
      mediumText: {
         ...baseStyles,
         fontSize: '16px'
      },
      regularText: {
         ...baseStyles,
         fontSize: '24px'
      },
      smallText: {
         ...baseStyles,
         fontSize: '12px'
      }
   }
   
})


const Text = ({children, hover, variant, color, bold}) => {
   const classes=useStyles({ color, hover, bold })

   return (
      <div className={classes[`${variant}Text`]}>{children}</div>
   )
}

Text.propTypes = {
   children: Proptypes.node.isRequired,
   variant: Proptypes.oneOf(['small', 'medium', 'regular', 'big']),
   color: Proptypes.string,
   bold: Proptypes.bool,
   hiver: Proptypes.string
}

Text.defaultProps = {
   variant: 'medium',
   color: false,
   bold: false,
   hover: false
}

export default Text
