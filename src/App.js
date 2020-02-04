import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Location } from '@reach/router';

import theme from './style/theme';
import useAuth from './hooks/useAuth';
import TodoApp from './components/TodoApp';
import Login from './components/Login';

function App() {
  const user = useAuth();

  return (
    <Location>
      {({ location }) => (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {user ? <TodoApp location={location} user={user} /> : <Login />}
        </ThemeProvider>
      )}
    </Location>
  );
}

export default App;
