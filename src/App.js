import "./App.css";
import { useEffect, useState } from "react";

import Box from "./components/Box";
import { auth, db, provider } from "./firebase";
import { UserContext } from "./contexts/UserContext";
import SidePanel from "./components/SidePanel";
import Routers from "./components/Routers";

const initialState = {
  email: null,
};

function App() {
  const [user, setUser] = useState(initialState);

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
    <div className="App">
      <UserContext.Provider value={user}>
        {/* <div className="sidePanel">
          <SidePanel />
        </div> */}
        <div className="main">
          <Routers signIn={signIn} signOut={signOut} />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
