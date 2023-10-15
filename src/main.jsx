import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./context/UserContext.jsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode>
    </UserProvider>
  </QueryClientProvider>
);
