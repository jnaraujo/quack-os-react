import "./styles/globals.scss"
import ApplicationProvider from "./contexts/ApplicationContext"

// Pages
import Main from "./pages/Home"
import { WebContainerProvider } from "./contexts/WebContainerContext"

const App = () => {
  return (
    <ApplicationProvider>
      <WebContainerProvider>
        <Main />
      </WebContainerProvider>
    </ApplicationProvider>
  )
}

export default App
