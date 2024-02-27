import "./App.css";
import Layout from "./components/Layout/Layout";
// import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyAccount } from "./pages/MyAccount/components/MyAccount/MyAccount";
import SignIn from "./pages/Login/components/SignIn/SignIn";
import SignUp from "./pages/Login/components/SignUp/SignUp";
import Forgot from "./pages/Login/components/Forgot/Forgot";
import Home from "./pages/Home/Home";
import CreateStory from "./components/CreateStory/CreateStory";
import GeneratedStory from "./components/GeneratedStory/GeneratedStory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="my-account" element={<MyAccount />}></Route>
          <Route path="create-story" element={<CreateStory />}></Route>
          <Route
            path="generated-story/:id"
            element={<GeneratedStory />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
