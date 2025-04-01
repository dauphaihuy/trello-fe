import { cyan, deepOrange, orange, red, teal } from '@mui/material/colors'
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    extendTheme,
} from '@mui/material/styles'
// Create a theme instance.
const APP_BAR_HEIGHT = '60px'
const BOARD_BAR_HEIGHT = '62px'
const BOARD_BAR_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const theme = extendTheme({
    colorSchemeSelector: 'class',
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_BAR_CONTENT_HEIGHT
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
    components: {
        // Name of the component
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#bdc3c7',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#00b894',
                        borderRadius: '8px'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    textTransform: 'none'
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem'
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.light
                    },
                    '&:hover': {
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main
                        }
                    },
                    '& fieldset': {
                        borderWidth: '1px !important'
                    }
                })
            },
        }
    },
    // ...other properties
});
export default theme;