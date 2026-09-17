import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user , isLoading } = useSelector((store) => store.authSlice);

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if (user) {
    return <Navigate to={"/home"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
