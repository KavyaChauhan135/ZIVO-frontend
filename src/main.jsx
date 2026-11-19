import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { restoreSession } from "./features/authThunks.js";

const queryClient = new QueryClient();

// Rehydrate auth from the refresh-token cookie once per page load. Started
// before render so it runs exactly once (no StrictMode double-effect issues).
// A rejection just means "not logged in"; the slice records that.
store.dispatch(restoreSession()).catch(() => {});

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
