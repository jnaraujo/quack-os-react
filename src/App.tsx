import "./styles/globals.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ApplicationProvider from "./contexts/ApplicationContext"

// Pages
import Main from "./pages/Home"
import { WebContainerProvider } from "./contexts/WebContainerContext"

const App = () => {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <WebContainerProvider>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </WebContainerProvider>
      </ApplicationProvider>
    </BrowserRouter>
  )
}

export default App
