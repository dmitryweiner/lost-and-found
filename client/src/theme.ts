import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#FFFFFF"
    },
    error: {
      main: red.A400
    }
  },
  spacing: 10
});

export default theme;
