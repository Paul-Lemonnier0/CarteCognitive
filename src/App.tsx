import { ReactFlowProvider } from 'reactflow';
import './App.css';
import GraphTest from './components/graphs/GraphTest';
import theme from './constantes/Colors';
import { AppContextProvider } from './context/AppContext';
import React from 'react';

function App() {
  return (
    <AppContextProvider>
      <ReactFlowProvider>
        <div className="App" style={{backgroundColor: theme.light.Primary}}>
          <GraphTest/>
        </div>
      </ReactFlowProvider>
    </AppContextProvider>
  );
}

export default App;
