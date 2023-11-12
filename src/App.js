import Search from "./pages/Search/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ThemeProvider, CssB } from '@emotion/react';
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import { darkTheme, lightTheme } from "./theme";
import Feed from "./pages/Feed/Feed";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/search"
            element={
              <Search toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            }
          />
          <Route
            path="/feed"
            element={
              <Feed toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
