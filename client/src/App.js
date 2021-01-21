import React from "react";
import ThemeProvider from "./theme";
import Router from "./router";

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
