import { createTheme } from '@mui/material/styles'

export default createTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000'
        },

        text: {
            primary: '#fff',
            secondary: '#000',
        }
    },

    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif'
        ].join(','),

        allVariants: {
            color: '#fff'
        },
    },

    components: {
        MuiTextField: {
            defaultProps: {
                className: 'm-2 w-full bg-slate-800 rounded-lg shadow-sm'
            }
        }
    }
})