import "./styles/globals.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ApplicationProvider from "./contexts/ApplicationContext"

// Pages
import Main from "./pages/Home"
import { PythonProvider } from "./contexts/PythonContext"
import { WebContainerProvider } from "./contexts/WebContainerContext"

const App = () => {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <WebContainerProvider>
          <PythonProvider>
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
          </PythonProvider>
        </WebContainerProvider>
      </ApplicationProvider>
    </BrowserRouter>
  )
}

export default App
