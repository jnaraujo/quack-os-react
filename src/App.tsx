import "./styles/globals.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ApplicationProvider from "./contexts/ApplicationContext"

// Pages
import Main from "./pages/Home"
import { PythonProvider } from "./contexts/PythonContext"

const App = () => {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <PythonProvider>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </PythonProvider>
      </ApplicationProvider>
    </BrowserRouter>
  )
}

export default App
