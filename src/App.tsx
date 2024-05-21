import { ReactFlowProvider } from 'reactflow';
import './App.css';
import { AppContextProvider } from './context/AppContext';
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

import "./assets/fonts/Poppins-Light.ttf"
import "./assets/fonts/Poppins-Medium.ttf"
import "./assets/fonts/Poppins-SemiBold.ttf"
import "./assets/fonts/Poppins-Bold.ttf"

function App() {
  useEffect(()=>{
    document.title = "CarteCognitive"
    }, [])

  return (
    <AppContextProvider>
      <ReactFlowProvider>
        <div className="App">
            <RouterProvider router={router}/>
        </div>
      </ReactFlowProvider>
    </AppContextProvider>
  );
}

export default App;
