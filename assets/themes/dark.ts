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
        neutral: {
            main: '#64748b'
        }
    },

    typography: {
        fontFamily: [
            'Montserrat', 
            'sans-serif'
        ].join(','),

        allVariants: {
            color: 'white'
        },
    },
})