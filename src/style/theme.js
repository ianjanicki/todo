import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(46, 170, 220)'
    }
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
