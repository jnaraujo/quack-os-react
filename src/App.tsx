import "./styles/globals.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ApplicationProvider from "./contexts/ApplicationContext"

// Pages
import Main from "./pages/Home"

const App = () => {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </ApplicationProvider>
    </BrowserRouter>
  )
}

export default App
