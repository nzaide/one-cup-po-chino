//App.js


import { useState } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import PageNotFound from './pages/PageNotFound';
import SpecificProduct from './pages/SpecificProduct';
import CartView from './pages/CartView';
import OrdersPage from './pages/OrdersPage';
import { Container } from 'react-bootstrap';
import { UserProvider } from './UserContext';
import { BiAdjust } from "react-icons/bi";

//react-router
//BrowserRouter as Router(alternative)
import { BrowserRouter, Routes, Route, NavLink, Switch} from 'react-router-dom';


//<>..</> (Fragment) needs to add if we added multiple components/html tags
function App() {


    //state hook for the user state that defined here for global scope
    //This will be used to store the user information and will be used for validating if a user is logged in on the app or not
    const [ user, setUser ] = useState({
        accessToken: localStorage.getItem('accessToken'),
        email: localStorage.getItem('email'),
        isAdmin: (localStorage.getItem('isAdmin') === 'true')
    })

    //function for clearing localStorage on logout
    const unsetUser = () => {
        localStorage.clear();
    }

  return (
    <UserProvider value = {{ user, setUser, unsetUser }} >
        <BrowserRouter>
            <AppNavbar />
            <Container>
                <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/products" element={ <ProductsPage /> }/>
                        <Route path="/register" element={ <Register /> }/>
                        <Route path="/login" element={ <Login /> }/>
                        <Route path="/logout" element={ <Logout /> }/>
                        <Route path="/mycart" element={ <CartView /> }/>
                        <Route path="/myorders" element={ <OrdersPage /> }/>
                        <Route path="/products/findproduct/:productId" element={ <SpecificProduct /> }/>
                        <Route path="*" element={ <PageNotFound /> } />
                </Routes>
            </Container>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;
