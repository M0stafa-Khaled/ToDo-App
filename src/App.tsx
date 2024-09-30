import { RouterProvider } from "react-router-dom";
import routes from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main>
      <RouterProvider router={routes} />
      <Toaster />
    </main>
  );
}

export default App;
