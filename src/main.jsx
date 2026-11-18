import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3500}
        newestOnTop
        pauseOnFocusLoss={false}
      />
    </Provider>
  </QueryClientProvider>,
);
