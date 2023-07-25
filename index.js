import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import User from './user-waiting-area';
import Approved from './order-approved';
import Denied from './order-denied';
import MyCart from './MyCart';
import MyOrders from './MyOrders';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/menu",
    element: <LandingPage />,
  },
  {
    path: "/cart",
    element: <MyCart />,
  },
  {
    path: "/orders",
    element: <MyOrders />,
  },
  {
    path: "/waiting",
    element: <User />
  },
  {
    path: "/approved",
    element: <Approved />
  },
  {
    path: "/denied",
    element: <Denied />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {router} />
);


