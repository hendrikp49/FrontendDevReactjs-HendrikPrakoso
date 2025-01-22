import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail-restaurant/:id" element={<DetailPage />} />
    </Routes>
  );
};

export default App;
