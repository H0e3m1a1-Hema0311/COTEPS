import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing onNavigate={() => undefined} />} />
    </Routes>
  );
};

export default AppRoutes;