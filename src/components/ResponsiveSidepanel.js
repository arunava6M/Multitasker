import { useState, useContext, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate, useLocation } from "react-router-dom";

import { ViewportContext } from "./ViewportProvider";
import { icons } from "../icons";
import Text from "./Text";
import Button from "./Button";
import Spacing from "./Spacer";
import { UserContext } from "../contexts/UserContext";
import { db } from "../firebase";


const useStyles = createUseStyles({
	container: {
		display: 'flex',
		height: '100%',	
	
	},
	sidepanel: {
		width: (({isOpen})=> isOpen ? '300px' : '120px'),
		background: '#30254d',
      boxShadow:  `13px 13px 26px #271e3f,
	  -13px -13px 26px #392c5b`,
		transition: 'all 0.5s ease',
		// marginRight: '100px'
	},
	openSidePanelButton: {
		color: '#4d4e52',
		height: '30px',
		marginLeft: '-15px',
		backgroundColor: '#dcdfe3',
		display: 'flex',
		borderRadius: '10px',
		width: '30px',
		alignItems: 'center',
		marginTop: '30px',
		transform: (({isOpen}) => isOpen && 'rotate(180deg)'),
		transition: 'all 0.3s ease'
	},
	panelItem: {
		position: 'relative',
		height: '60px',
		width: (({sidePanelIsOpen}) => sidePanelIsOpen ? '80%' : '50px' ),
		margin: '20px',
		backgroundColor: (({routed}) => routed && '#d3c7f0'),
		borderRadius: '10px',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		color: '#4b377d',
		paddingLeft: '20px',
		transition: 'all 0.3s ease',
		cursor: 'pointer',
		"&:hover": {
			backgroundColor: '#d3c7f0',
		},
	},
	userContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
		margin: '20px 20px 20px 30px',
	  },
	image: {
		height: "60px",
		borderRadius: "50%",
	},
})

const useSmallScreenStyles = createUseStyles({
	mobileSidePanelButton: {
		color: '#4d4e52',
		height: '30px',
		backgroundColor: '#dcdfe3',
		display: 'flex',
		justifyContent: 'center',
		borderRadius: '50%',
		width: '30px',
		alignItems: 'center',
		margin: '10px',
		zIndex: '2'
	},
})
const ResponsiveSidepanel = () => {
	const [show, setShow] = useState(false)
	const [userData, setUserData] = useState({})
	const { isSmallScreen } = useContext(ViewportContext)
	const classes = useSmallScreenStyles()
	const user = useContext(UserContext);

	useEffect(() => {
		if (user.email) {
		  db.collection("users")
			.doc(user.email)
			.onSnapshot((doc) => {
			  const name = doc.data().displayName.split(" ");
			  const tempData = {
				firstName: name[0],
				lastName: name[1],
				...doc.data(),
			  };
			  setUserData(tempData);
			});
		}
	  }, [setUserData, user]);

	return isSmallScreen ?
		<>
			<div className={classes.mobileSidePanelButton} onClick={() => setShow(!show)}>
				<Text variant="large">
					{icons['ok']}
				</Text>
			</div>
			<Container show={show} userData={userData}/>
		</>
		: <Container show={true} userData={userData}/>
}

const Container = ({show, userData}) => {
	const [isOpen, setIsOpen] = useState(false)
	const classes = useStyles({isOpen})
	const navigate = useNavigate();
	const {pathname} = useLocation()

	const headerLinks = [
		{
			name: "Dashboard",
			icon: "task",
			link: "/dashboard",
		},
		{
			name: "Contribute",
			icon: "contribute",
			link: "/contribute",
		},
	];

	if(!show) return null;

	return (
		<div className={classes.container}>
			<div className={classes.sidepanel}>
				<div className={classes.userContainer} >
					<img className={classes.image} src={userData.photoURL} alt="dp"/>
					{isOpen && 
						<>
							<Spacing width="10px" />
							<div>
								<Text color="#e8e8e8" variant="small" bold>{userData.firstName} {userData.lastName}</Text>
								<Spacing height="5px" />
								<Text color="#c7c5c5" variant="small">@arun95</Text>
							</div>
						</>
					}
				</div>
				{headerLinks.map(({ name, icon, link }) =>
					<PanelItem icon={icon} name={name} onClick={() => navigate(link)} sidePanelIsOpen={isOpen} routed={pathname === link}/>
				)}
			</div>
			<div className={classes.openSidePanelButton}>
				<Button variant='text' onClick={() => setIsOpen(!isOpen)}>
						{icons['expandIcon']}
				</Button>
			</div>
		</div>

	)
}

const PanelItem = ({ icon, name, onClick, sidePanelIsOpen, routed}) => {
	const classes = useStyles({sidePanelIsOpen, routed})

	return (
		<div className={classes.panelItem} key={name} onClick={onClick} >
			<Text variant="medium">{icons[icon]}</Text>
			{sidePanelIsOpen && 
				<>
					<Spacing width="20px" />
					<Text variant="small">{name}</Text>
				</>
			}
		</div>
	)
}

export default ResponsiveSidepanel