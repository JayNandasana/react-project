import Nevbar from "./components/Nevbar";
import Templates from "./components/Templates";
import GetLogin from "./components/GetLogin";
import GetRegister from "./components/GetRegister";
import Login from "./components/Login";
import DataProvider from "./context/DataProvider";
import Home from "./components/Home";
import Components from "./components/Components";
import AdminPanel from "./components/AdminPanel";
import AdminButtonCompo from "./components/AdminButtonCompo";
import ButtonCompo from "./components/ButtonCompo";
import CheckboxCompo from "./components/CheckboxCompo";
import AdminCheckboxCompo from "./components/AdminCheckboxCompo";
import AdminUser from "./components/AdminUser";
import UserProfile from "./components/UserProfile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react"; 
import { DataContext } from "./context/DataProvider";

function App() {
  return (
    <DataProvider> 
      <BrowserRouter>
        <Nevbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="Templates" element={<Templates/>} />
          <Route path="Components" element={<Components/>} />
          <Route path="GetLogin" element={<ProtectedGetLogin/>} />
          <Route path="GetRegister" element={<ProtectedGetRegister/>} />
          <Route path="Login" element={<Login/>} />
          <Route path="AdminPanel" element={<ProtectedAdmin/>} />
          <Route path="/AdminPanel/ButtonCompo" element={<ProtectedAdminBtn/>} />
          <Route path="/Components/ButtonCompo" element={<ProtectedButtonCompo/>} />
          <Route path="/AdminPanel/CheckboxCompo" element={<ProtectedAdminCheckbox/>} />
          <Route path="/Components/CheckboxCompo" element={<ProtectedCheckboxCompo/>} />
          <Route path="/AdminPanel/User" element={<ProtectedAdminUser/>} />
          <Route path="/UserProfile" element={<ProtectedUserProfile/>} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

function ProtectedAdmin() {
  const { account } = useContext(DataContext);
  if (account === "admin") {
    return <AdminPanel />; 
  } else {
    return <Navigate to="/"  />;
  }
}
function ProtectedAdminBtn() {
  const { account } = useContext(DataContext);
  if (account === "admin") {
    return <AdminButtonCompo />; 
  }
  else{
    return <Navigate to="/"  />;
  }
    
}
function ProtectedAdminCheckbox() {
  const { account } = useContext(DataContext);
  if (account === "admin") {
    return <AdminCheckboxCompo />; 
  }
  else {
    return <Navigate to="/"  />;
  }
}
function ProtectedAdminUser() {
  const { account } = useContext(DataContext);
  if (account === "admin") {
    return <AdminUser />; 
  }
  else {
    return <Navigate to="/"  />;
  }
}
function ProtectedUserProfile() {
  const { account } = useContext(DataContext);
  if (account) {
    return <UserProfile />; 
  }
  else {
    return <Navigate to="/"  />;
  }
}
function ProtectedButtonCompo() {
  const { account } = useContext(DataContext);
  if (account) {
    return <ButtonCompo />; 
  }
  else {
    alert("Please login");
    return <Navigate to="/"  />;
  }
}
function ProtectedCheckboxCompo() {
  const { account } = useContext(DataContext);
  if (account) {
    return <CheckboxCompo />; 
  }
  else {
    alert("Please login"); 
    return <Navigate to="/"  />;
  }
}
function ProtectedGetLogin() {
  const { account } = useContext(DataContext);
  if (account) {
    return <GetLogin />; 
  }
  else {
    alert("Please login");
    return <Navigate to="/"  />;
  }
}
function ProtectedGetRegister() {
  const { account } = useContext(DataContext);
  console.log("ProtectedGetRegister rendered");
  if (account) {
    return <GetRegister />; 
  }
  else {
    alert("Please login");
    return <Navigate to="/"  />;
  }
}

export default App;