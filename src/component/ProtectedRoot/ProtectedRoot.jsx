import { Navigate } from "react-router-dom";


const ProtectedRoot = (props) => {


  if (localStorage.getItem("token")) {
    return props.children
  }
  else {
    return <Navigate to={'/signin'}></Navigate>
  }



}


export default ProtectedRoot;