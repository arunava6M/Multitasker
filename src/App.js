import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { BrowserRouter } from 'react-router-dom'


import { auth, db, provider } from "./firebase";
import { UserContext } from "./contexts/UserContext";
import { ThemeContext } from "./contexts/ThemeContext";
import SidePanel from "./components/SidePanel";
import Routers from "./components/Routers";
import { DARK_THEME } from './constants/colours';
import { ViewportProvider } from "./components/ViewportProvider";
import ResponsiveSidepanel from "./components/ResponsiveSidepanel";
import Login from './pages/login'

const {appBackgroundImage, sidePanelBackgroundImage} = DARK_THEME
const initialState = {
  email: null,
};

const useStyles = createUseStyles({
  app: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    backgroundImage: ({theme}) => theme.appBackgroundImage,
    fontFamily: "Quicksand, sans-serif",
    transition: 'background-image 0.2s ease-in-out',
  },
  signInContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sidePanel: {
    flex: ({user}) => user.email ? 0.4 : 3,
    transition: '1s',
    boxShadow: '30px 30px 61px #2b2145, -30px -30px 61px #352955'

    // padding: '0 0 0 30px',
    // boxShadow: '20px 1px 33px -3px rgba(0,0,0,0.1)',
    // backgroundImage:({theme}) => `linear-gradient(135deg, ${theme.sidePanelBackgroundImage.color1}, ${theme.sidePanelBackgroundImage.color1}, ${sidePanelBackgroundImage.color2}, ${sidePanelBackgroundImage.color2},  ${sidePanelBackgroundImage.color3})`,
    // borderRight: '1px solid rgba(115, 90, 204,0.2)'
  },
  main: {
    flex:  ({user}) => user.email ? 3 : 1,
    transition: '1s'
  }
});

function App() {
  const [user, setUser] = useState(initialState);
  const [theme, setTheme] = useState(DARK_THEME);
  const classes = useStyles({user, theme});

  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem("user"));
    if (parsedUser) setUser(parsedUser);
  }, []);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user: { email, displayName, photoURL } }) => {
        localStorage.setItem("user", JSON.stringify({ email }));
        setUser({ email });

        const docRef = db.collection("users").doc(email);
        docRef.get().then((doc) => {
          if (!doc.exist) {
            docRef.set({
              email,
              displayName,
              photoURL,
            });
          }
        });
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(initialState);
    });
  };

  return (
    <BrowserRouter>
      <div className={classes.app}>
        <ViewportProvider>
          <ThemeContext.Provider value={theme}>
            <UserContext.Provider value={user}>
              {!user.email &&
                <div className={classes.sidePanel}>
                  {/* <SidePanel signIn={signIn} toggleTheme={setTheme}/> */}
                  <Login signIn={signIn} />
                </div>
              }
              {user.email && <ResponsiveSidepanel />}
              
              <div className={classes.main}>
                <Routers signIn={signIn} signOut={signOut} />
              </div>
            </UserContext.Provider>
          </ThemeContext.Provider>
        </ViewportProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
