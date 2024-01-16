// AppRouter.js
import { Auth } from "pages/Auth/Auth";
import { Home } from "pages/Home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Profile } from "../pages/Profile/Profile";
import styles from "./AppRouter.module.css";
import { Navigation } from "./Navigation/Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router basename='/flick-favor-hub'>
      <div className={styles.container}>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path='/' element={<Home userObj={userObj} />} />
              <Route
                exact
                path='/profile'
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
            </>
          ) : (
            <Route exact path='/' element={<Auth />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
