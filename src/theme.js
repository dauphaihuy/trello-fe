import { cyan, deepOrange, orange, red, teal } from '@mui/material/colors'
import {
    createTheme,
    Experimental_CssVarsProvider as CssVarsProvider,
    extendTheme,
} from '@mui/material/styles'
// Create a theme instance.
const APP_BAR_HEIGHT = '56px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_BAR_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const theme = createTheme({
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
                        backgroundColor: '#dcdde1',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'white',
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
                    textTransform: 'none',
                    borderWidth: '0.5px'
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    '&.MuiTypography-body1': { fontSize: '0.875rem' }
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
                    '& fieldset': { borderWidth: '0.5px !important' },
                    '&:hover fieldset': { borderWidth: '1px !important' },
                    '&.Mui-focused fieldset': { borderWidth: '1px !important' }

                })
            },
        }
    },
    // ...other properties
});
export default theme;