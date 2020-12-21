import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';
import usePersistedState from './utils/usePersistentState';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';



const App: React.FC = () => {
  const [theme ] = usePersistedState<DefaultTheme>('light', lightTheme);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;
