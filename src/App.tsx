import { lazy } from "react";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";
import { GlobalStyles } from "./styles/globals";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ApplicationProvider from "./contexts/applicationContext";
// Pages
const Loading = lazy(() => import("./pages/Loading"));
import Home from "./pages/Home";

const App = () => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />

    <BrowserRouter>
      <ApplicationProvider>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ApplicationProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
