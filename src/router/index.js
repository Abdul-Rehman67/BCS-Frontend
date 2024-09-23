import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./privateRoutes";
import Stats from "../pages/Stats";
import Books from '../utilities/Books'
import CreateAccount from "../pages/CreateAccount";

function Navigator() {
  const login = localStorage.getItem("isAuthenticated");



  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route exact path="/stats" element={<Stats books={Books}/>}></Route>

          </Route>
            <Route exact path="/createaccount" element={<CreateAccount/>}></Route>
          <Route element={<Login />} path="/login" />


        </Routes>
      </Router>
    </>
  );
}

export default Navigator;
