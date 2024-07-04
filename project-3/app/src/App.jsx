import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditBook from "./component/pages/EditBook";
import DeleteBook from "./component/pages/DeleteBook";
import ViewBook from "./ViewBook";
import Home from "./component/pages/Home";
import AddBook from "./component/pages/AddBook";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/edit/:id" element={<EditBook />}></Route>
          <Route path="/delete/:id" element={<DeleteBook />}></Route>
          <Route path="/view/:id" element={<ViewBook />}></Route>
          <Route path="/add" element={<AddBook/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
