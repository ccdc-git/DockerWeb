import "./App.css";
import { Route, Routes } from "react-router-dom";
import ItemListPage from "./pages/ItemListPage";
import ItemPage from "./pages/ItemPage";
import NewItemPage from "./pages/NewItemPage";

function App() {
  return (
    <Routes>
      <Route path="item">
        <Route path="" element={<ItemListPage />} />
        <Route path=":itemId" element={<ItemPage />} />
        <Route path="new" element={<NewItemPage />} />
      </Route>
      <Route path="" element={<>Not Found</>} />
    </Routes>
  );
}

export default App;
