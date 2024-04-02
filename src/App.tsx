import { ReactFlowProvider } from 'reactflow';
import './App.css';
import { AppContextProvider } from './context/AppContext';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, RouterProvider } from 'react-router-dom';
import router from './Router';
import AppTopBar from './components/TopBar/TopBar';

import "./assets/fonts/Poppins-Light.ttf"
import "./assets/fonts/Poppins-Medium.ttf"
import "./assets/fonts/Poppins-SemiBold.ttf"
import "./assets/fonts/Poppins-Bold.ttf"

function App() {
  useEffect(()=>{
    document.title = "CarteCognitive"
    }, []
  )

  return (
    <AppContextProvider>
      <ReactFlowProvider>
        <div className="App" style={{backgroundColor: "#ebedee", display: "flex", flexDirection: "column"}}>

            <RouterProvider router={router}/>
            {/* <div style={{          
              display: "flex",
              flexDirection: "row", flex: 1}}>
              <SideBar/>
              <GraphContextProvider defaultNodes={DEFAULT_NODES} defaultEdges={DEFAULT_EDGES}>
                <GraphTest/>
              </GraphContextProvider>
            </div> */}
        </div>
      </ReactFlowProvider>
    </AppContextProvider>
  );
}

export default App;
