import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SearchMovies from "./SearchMovies";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="container">
      <h1 className="title">React Movie Search</h1>
      <SearchMovies />
    </div>
  </StrictMode>
);
