import './App.css';

import React from 'react'
import { useRoutes } from "react-router-dom";
// import Home from './home';
import User from './user';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <User />
    },
    { path: "/userData", element: <User /> },
  ]);

  return element;
}

export default App;