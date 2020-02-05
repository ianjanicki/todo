import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(46, 170, 220)'
    }
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  }
});

const theme = {
  ...rawTheme,
  overrides: {
    // MuiIconButton: {
    //   root: {
    //     borderRadius: rawTheme.shape.borderRadius
    //   }
    // }
  }
};

export default responsiveFontSizes(theme);
