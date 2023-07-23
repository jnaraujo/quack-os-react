import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styles/globals"
import { lightTheme } from "./styles/themes"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import ApplicationProvider from "./contexts/ApplicationContext"

// Pages
import Main from "./pages/Home"

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <ApplicationProvider>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </ApplicationProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
