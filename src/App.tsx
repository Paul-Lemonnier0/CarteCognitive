import { ReactFlowProvider } from 'reactflow';
import './App.css';
import GraphTest from './components/graphs/GraphTest';
import theme from './constantes/Colors';
import { AppContextProvider } from './context/AppContext';
import React, { useEffect } from 'react';
import SideBar from './components/SideBar/SibeBar';

function App() {
  useEffect(()=>{
    document.title = "CarteCognitive"
    }
  )
  return (
    <AppContextProvider>
      <ReactFlowProvider>
        <div className="App" style={{backgroundColor: theme.light.Primary}}>
          <SideBar/>
          <GraphTest/>
        </div>
      </ReactFlowProvider>
    </AppContextProvider>
  );
}

export default App;
