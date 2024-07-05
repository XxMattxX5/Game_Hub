import React from "react";
import { createRoot } from "react-dom/client";
import Base from "./Base";
import { AuthProvider } from "../hooks/useAuth";

export default function App() {
  return (
    <AuthProvider>
      <Base />
    </AuthProvider>
  );
}

const appDiv = createRoot(document.getElementById("app"));
appDiv.render(<App />);
