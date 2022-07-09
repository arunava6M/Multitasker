import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "./Dashboard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import Contribute from "./Contribute";
import {Carousel} from "react-responsive-carousel"
import {ReactComponent as Img1} from '../images/sitting.svg'
import {ReactComponent as Img2} from '../images/multi.svg'
import {ReactComponent as Img3} from '../images/three.svg'
import {ReactComponent as Img4} from '../images/img4.svg'
import {ReactComponent as Img5} from '../images/img5.svg'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  imageSlider: {
    height: '200px',
  },
  eachImage: {
    width: '300px',
    objectFit: 'contain',
    animation: '$fadein 2s linear forwards'
  },
  fadeIn : {
    animation: '$fadein 4s linear forwards'
  },
  '@keyframes fadein': {
    '0%,100%': {opacity: 0},
    '30%,80%': {opacity: 1}
  },
  carousel: {
    height: '100%',
    // backgroundColor: 'red',
    overflow: 'hidden',
    // backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


const ImageSlider = () => {
  const [imgIndex, setImgIndex] = useState(0)
  const classes = useStyles()
  useEffect(() => {
    const imgTimer = setTimeout(()=>{
      if(imgIndex === 2){
        setImgIndex(0)
      }else {
        setImgIndex(prev => prev+1)
      }
      console.log(imgIndex)
    }, 2000)
    return () => clearTimeout(imgTimer)
  })

  const arr = [
    <Img1 className={classes.eachImage} style={{height: '250px'}}/>,
    <Img2 className={classes.eachImage}/>,
    <Img3 className={classes.eachImage} style={{width: '400px'}}/>,
  ]

  return (
    <div className={classes.carousel}>
      {arr[imgIndex]}
  </div>
) }

const Routers = ({ signIn, signOut }) => {
  const user = useContext(UserContext);
  const checkLogin = (component) =>
    user.email ? component : <Navigate to="/" />;
  console.log('inside routers')
  return (
    <>
      <Header signOut={signOut} />
      <Routes>
        <Route exact path="/" element={ user.email ? <Navigate to="/dashboard" /> : <ImageSlider />} />
        <Route path="/dashboard" element={checkLogin(<Dashboard />)} />
        <Route path="/contribute" element={checkLogin(<Contribute />)} />
      </Routes>
    </>
  );
};

export default Routers;
