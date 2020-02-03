import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const rawTheme = createMuiTheme({});

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
