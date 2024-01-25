import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './component/Layout/Layout';
import Home from "./component/Home/Home";
import Sale from './component/Sale/Sale';
import ProductDetails from './component/ProductDetails/ProductDetails';
import SignIn from "./component/SignIn/SignIn";
import SignUp from './component/SignUp/SignUp';
import CartContextProvider from "./Context/CartContext";
import WishListContextProvider from "./Context/WishListContext";
import WomenClothing from './component/WomenClothing/WomenClothing';
import ElectronicDevices from './component/ElectronicDevices/ElectronicDevices';
import MenClothing from './component/MenClothing/MenClothing';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import ProtectedRoot from './component/ProtectedRoot/ProtectedRoot';
import CheckOut from './component/CheckOut/CheckOut';
import Allorders from './component/Allorders/Allorders';
import Verfiycode from './component/VerfiyCode/VerfiyCode';
import RePassword from './component/RePassword/RePassword';
import { Provider } from "react-redux";
import MyStore from "./Redux/MyStore";
import ResetCodeContextProvider from "./Context/VerfiyCodeContext";
import Notfound from './NotFound/Notfound';
const App = () => {


  const routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: "true", element: <Home /> },
        { path: "sale", element: <Sale /> },
        { path: "productdetails/:id", element: <ProductDetails /> },
        { path: "signIn", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "menClothing", element: <MenClothing /> },
        { path: "WomenClothing", element: <WomenClothing /> },
        { path: "ElectronicDevices", element: <ElectronicDevices /> },
        { path: "ForgotPassword", element: <ForgotPassword /> },
        { path: "checkOut/:id", element: <ProtectedRoot><CheckOut /></ProtectedRoot> },
        { path: "allorders", element: <Allorders /> },
        { path: "verfiycode", element: <Verfiycode /> },
        { path: "RePassword", element: <RePassword /> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ])




  return <>
  
    <Provider store={MyStore}>
      <ResetCodeContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <RouterProvider router={routers} />
          </CartContextProvider>
        </WishListContextProvider>
      </ResetCodeContextProvider >

    </Provider>
  </>


}

export default App;
