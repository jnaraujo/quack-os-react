import { lazy, ReactElement, useEffect, useState } from "react";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";
import { GlobalStyles } from "./styles/globals";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ApplicationProvider from "./contexts/applicationContext";

// Pages
import Main from "./pages/Main";

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
  );
};

export default App;
