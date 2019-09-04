import { createMuiTheme } from '@material-ui/core/styles'

const customTheme = {
  palette: {
    primary: {
      light: '#9C27B0',
      main: '#7B1FA2',
      dark: '#4A148C',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#ef2e63',
      main: '#ed1651',
      dark: '#d91148',
      contrastText: '#FFFFFF'
    },
    error: {
      light: '#ef2e63',
      main: '#ed1651',
      dark: '#d91148',
      contrastText: '#FFFFFF'
    }
  }
}

const theme = createMuiTheme(customTheme)
export default theme
