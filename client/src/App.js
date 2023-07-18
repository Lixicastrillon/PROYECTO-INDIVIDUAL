import './App.css';
import LandingPage from './Componentes/LandingPage/LandingPage';
import { Routes, Route , useLocation } from "react-router-dom";
import Cards from './Componentes/Cards/Cards';
import NavBar from "./Componentes/NavBar/NavBar";
import Detail from "./Componentes/Detail/Detail"


function App() {

  const {pathname} = useLocation()
  return (
    <div >
      {pathname !== "/" && pathname === "/home" && <NavBar/> }
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Cards/>}/>
      <Route path="/detail/:idRaza" element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
