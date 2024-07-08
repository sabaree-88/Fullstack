import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditBook from "./component/pages/EditBook";
import DeleteBook from "./component/pages/DeleteBook";
import ViewBook from "./component/pages/ViewBook";
import Home from "./component/pages/Home";
import AddBook from "./component/pages/AddBook";
import Login from "./component/signup_login/Login";
import SignUp from "./component/signup_login/SignUp";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/edit/:id" element={<EditBook />}></Route>
          <Route path="/delete/:id" element={<DeleteBook />}></Route>
          <Route path="/view/:id" element={<ViewBook />}></Route>
          <Route path="/add" element={<AddBook />}></Route>
          // routes for SignUp and Login
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
