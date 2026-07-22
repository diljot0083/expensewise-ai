import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";
import AppLoader from "./components/AppLoader";

function App() {
  const { loading } = useAuth();

  if (loading) return <AppLoader />;

  return <AppRoutes />;
}

export default App;