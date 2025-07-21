import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Reports } from "./pages/Reports";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <Header />
        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </Router>
    </FluentProvider>
  );
}

export default App;
