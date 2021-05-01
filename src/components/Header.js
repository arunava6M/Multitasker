import {createUseStyles} from 'react-jss'
import { icons } from '../icons'
import Box from './Box'

import Grouped from './Grouped'
import Text from './Text'

const useStyles = createUseStyles({
   headerContainer: {
      fontSize: 18,
      fontWeight: 500,
      height: ({isSmallScreen}) => isSmallScreen ? '90px' : '30px',
      display: 'flex',
      flexDirection: ({isSmallScreen}) => isSmallScreen ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: ({isSmallScreen}) => isSmallScreen ? 'left' : 'center',
      padding: '10px'

   },
   icon: {
      fontSize: 34,
      color: '#3ca5c2',
      paddingRight: ({isSmallScreen}) => !isSmallScreen && '50px',
      paddingLeft: '50px'
   },
   search: {
      width: ({isSmallScreen}) => isSmallScreen ? '100%' : '40%',
      border: '3px solid #00B4CC',
      padding: '5px',
      height: '30px',
      borderRadius: '5px 0 0 5px',
      outline: 'none',
      color: '#8c9196'
   }
})

const headerLinks = [
   {
      name: 'Main',
      icon: 'calendar'
   },
   {
      name: 'Main',
      icon: 'calendar'
   },
   {
      name: 'Main',
      icon: 'calendar'
   }
]

const Header = ({ isSmallScreen }) => {
   const classes = useStyles({ isSmallScreen })

   return (
      <div className={classes.headerContainer}>
         <Grouped>
            {headerLinks.map(({ name, icon }) => (
               <Box variant="button">
                  <Text variant="small">{icons[icon]}</Text>
                  <Text variant="small">{name}</Text>
               </Box>
            ))}
         </Grouped>
      </div>
   )
}

export default Header