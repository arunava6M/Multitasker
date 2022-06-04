import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";


import Box from "./components/Box";
import { auth, db, provider } from "./firebase";
import { UserContext } from "./contexts/UserContext";
import SidePanel from "./components/SidePanel";
import Routers from "./components/Routers";

const initialState = {
  email: null,
};

const useStyles = createUseStyles({
  app: {
    /* text-align: center; */
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    /* align-items: center; */
    // backgroundColor: "#f2f3f9",
    backgroundImage: 'linear-gradient(135deg, #30254d, #130c1a, #30254d)',
    fontFamily: "Quicksand, sans-serif"
  },
  signInContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  sidePanel: {
    flex: ({user}) => user.email ? 0.4 : 3,
    transition: '1s',
    padding: '0 0 0 30px',
    boxShadow: '20px 1px 33px -3px rgba(0,0,0,0.1)',
    backgroundImage: 'linear-gradient(135deg, rgba(53, 54, 59,0.1), rgba(53, 54, 59,0.1), rgba(25, 28, 41,1), rgba(25, 28, 41,1),  rgba(53, 54, 59,0.1))',
    borderRight: '1px solid rgba(115, 90, 204,0.2)'
    // opacity: 0.1

  },
  main: {
    flex:  ({user}) => user.email ? 3 : 1,
    transition: '1s'
  }
});

function App() {
  const [user, setUser] = useState(initialState);
  const classes = useStyles({user});

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
    <div className={classes.app}>
      <UserContext.Provider value={user}>
        <div className={classes.sidePanel}>
          <SidePanel signIn={signIn} />
        </div>
        <div className={classes.main}>
          <Routers signIn={signIn} signOut={signOut} />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
