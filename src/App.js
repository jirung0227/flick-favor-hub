import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({ uid: user.uid, displayName: user.displayName });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({ uid: user.uid, displayName: user.displayName });
        setIsLoggedIn(true);
      } else {
        setUserObj(false);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className='App'>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "initalizing..."
      )}
    </div>
  );
}

export default App;
