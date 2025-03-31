import { cyan, deepOrange, orange, red, teal } from '@mui/material/colors'
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    extendTheme,
} from '@mui/material/styles'
// Create a theme instance.
const theme = extendTheme({
    colorSchemeSelector: 'class',
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange
            },
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange
            },
        },
    },
    // ...other properties
});
export default theme;