import { lazy, ReactElement, useEffect, useState } from "react";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";
import { GlobalStyles } from "./styles/globals";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ApplicationProvider from "./contexts/applicationContext";
// Pages
const Loading = lazy(() => import("./pages/Loading"));
import Desktop from "./pages/Desktop";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <ApplicationProvider>
          <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/os" element={<Desktop />} />
          </Routes>
        </ApplicationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
