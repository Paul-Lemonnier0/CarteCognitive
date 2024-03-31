import { ReactFlowProvider } from 'reactflow';
import './App.css';
import GraphTest from './components/graphs/GraphTest';
import theme from './constantes/Colors';
import { AppContextProvider } from './context/AppContext';
import React, { useEffect } from 'react';
import SideBar from './components/SideBar/SibeBar';
import TopBar from './components/TopBar/TopBar';
import { GraphContextProvider } from './context/GraphContext';
import { DEFAULT_EDGES, DEFAULT_NODES } from './data/Graphes/DefaultGraph';

function App() {
  useEffect(()=>{
    document.title = "CarteCognitive"
    }
  )
  return (
    <AppContextProvider>
      <ReactFlowProvider>
        <div className="App" style={{
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          }}>
            <TopBar/>
            <div style={{          
              display: "flex",
              flexDirection: "row", flex: 1}}>
              <SideBar/>
              <GraphContextProvider defaultNodes={DEFAULT_NODES} defaultEdges={DEFAULT_EDGES}>
                <GraphTest/>
              </GraphContextProvider>
            </div>
        </div>
      </ReactFlowProvider>
    </AppContextProvider>
  );
}

export default App;
