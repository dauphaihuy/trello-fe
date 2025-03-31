import { cyan, deepOrange, orange, red, teal } from '@mui/material/colors'
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    extendTheme,
} from '@mui/material/styles'
// Create a theme instance.
const APP_BAR_HEIGHT = '60px'
const BOARD_BAR_HEIGHT = '62px'

const theme = extendTheme({
    colorSchemeSelector: 'class',
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
    },
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange
            },
            spacing: (factor) => `${0.25 * factor}rem`,
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange
            },
            spacing: (factor) => `${0.25 * factor}rem`,
        },

    },
    // ...other properties
});
export default theme;