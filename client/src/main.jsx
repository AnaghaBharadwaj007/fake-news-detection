import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import supabase from "./supabaseClient.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </SessionContextProvider>
  </StrictMode>
);
