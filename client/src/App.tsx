import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or spinner
  }

  return <AppRoutes />;
}

export default App;