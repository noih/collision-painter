import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { MainPage } from '/src/pages'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <MainPage />
    </ThemeProvider>
  )
}
