import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import SearchPage from "./page/SearchPage";
import FavoritesPage from "./page/FavoritesPage";
import RepositoryPage from "./page/RepositoryPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/repository/:id" element={<RepositoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
