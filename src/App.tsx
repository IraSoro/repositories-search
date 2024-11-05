import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import SearchPage from "./page/SearchPage";
import FavoritesPage from "./page/FavoritesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header favorites={0}/>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
