import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SetTimer from './components/SetTimer';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SetTimer />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
