import './App.css';
import GraphTest from './components/graphs/GraphTest';
import theme from './constantes/Colors';
import { AppContextProvider } from './context/AppContext';
import React from 'react';

function App() {
  return (
    <AppContextProvider>
      <div className="App" style={{backgroundColor: theme.light.Primary}}>
        <GraphTest/>
      </div>
    </AppContextProvider>
  );
}

export default App;
