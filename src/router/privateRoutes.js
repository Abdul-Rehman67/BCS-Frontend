import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  let auth =  localStorage.getItem("isAuthenticated") ;
  console.log(auth)
  return auth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
