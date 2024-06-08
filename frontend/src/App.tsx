import Header from "./components/layout/header";
import {Box} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import BooksPage from "./pages/books-page";

import "./App.css";
import ReadingListPage from "./pages/reading-list-page";
import NotFoundPage from "./pages/not-found-page";

function App() {
  return (
    <Box sx={{ paddingX: "10px" }} className="app-container">
      <Header />

      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/reading-list" element={<ReadingListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}

export default App;
